module room_manager::competition {
    use std::signer;
    use std::vector;
    use std::string::{Self, String};
    use aptos_framework::coin::{Self, Coin};
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::account;
    use aptos_framework::event;

    // Error codes
    const E_NOT_ADMIN: u64 = 1;
    const E_ROOM_NOT_FOUND: u64 = 2;
    const E_BETTING_CLOSED: u64 = 3;
    const E_COMPETITION_NOT_STARTED: u64 = 4;
    const E_ALREADY_REGISTERED: u64 = 5;
    const E_INSUFFICIENT_PAYMENT: u64 = 6;
    const E_INVALID_AGENT: u64 = 7;
    const E_COMPETITION_FINISHED: u64 = 8;

    // Competition states
    const STATE_OPEN: u8 = 0;
    const STATE_BETTING: u8 = 1;
    const STATE_RUNNING: u8 = 2;
    const STATE_FINISHED: u8 = 3;

    // Agent information
    struct AgentInfo has store, copy, drop {
        agent_address: address,
        developer: address,
        name: String,
        description: String,
        registered_at: u64,
    }

    // Bet information
    struct BetInfo has store, copy, drop {
        bettor: address,
        agent_address: address,
        amount: u64,
        placed_at: u64,
    }

    // Room structure
    struct Room has key, store {
        admin: address,
        name: String,
        description: String,
        problem_statement: String,
        entry_fee: u64,
        max_agents: u64,
        min_bet: u64,
        max_bet: u64,
        agents: vector<AgentInfo>,
        bets: vector<BetInfo>,
        state: u8,
        prize_pool: Coin<AptosCoin>,
        winner_agent: address,
        created_at: u64,
    }

    // Global room storage
    struct RoomStorage has key {
        rooms: vector<Room>,
        next_room_id: u64,
    }

    // Events
    #[event]
    struct RoomCreated has drop, store {
        room_id: u64,
        admin: address,
        name: String,
    }

    #[event]
    struct AgentRegistered has drop, store {
        room_id: u64,
        agent_address: address,
        developer: address,
        name: String,
    }

    #[event]
    struct BetPlaced has drop, store {
        room_id: u64,
        bettor: address,
        agent_address: address,
        amount: u64,
    }

    #[event]
    struct CompetitionStarted has drop, store {
        room_id: u64,
        total_agents: u64,
        total_bets: u64,
    }

    #[event]
    struct WinnerDeclared has drop, store {
        room_id: u64,
        winner_agent: address,
        prize_distributed: u64,
    }

    // Initialize the contract
    fun init_module(admin: &signer) {
        let room_storage = RoomStorage {
            rooms: vector::empty<Room>(),
            next_room_id: 0,
        };
        move_to(admin, room_storage);
    }

    // Create a new competition room
    public entry fun create_room(
        admin: &signer,
        name: String,
        description: String,
        problem_statement: String,
        entry_fee: u64,
        max_agents: u64,
        min_bet: u64,
        max_bet: u64,
    ) acquires RoomStorage {
        let admin_addr = signer::address_of(admin);
        let room_storage = borrow_global_mut<RoomStorage>(@room_manager);
        
        let room = Room {
            admin: admin_addr,
            name,
            description,
            problem_statement,
            entry_fee,
            max_agents,
            min_bet,
            max_bet,
            agents: vector::empty<AgentInfo>(),
            bets: vector::empty<BetInfo>(),
            state: STATE_OPEN,
            prize_pool: coin::zero<AptosCoin>(),
            winner_agent: @0x0,
            created_at: 0, // In production, use timestamp
        };

        let room_id = room_storage.next_room_id;
        vector::push_back(&mut room_storage.rooms, room);
        room_storage.next_room_id = room_id + 1;

        event::emit(RoomCreated {
            room_id,
            admin: admin_addr,
            name: room.name,
        });
    }

    // Register an agent for a room
    public entry fun register_agent(
        developer: &signer,
        room_id: u64,
        agent_address: address,
        name: String,
        description: String,
    ) acquires RoomStorage {
        let dev_addr = signer::address_of(developer);
        let room_storage = borrow_global_mut<RoomStorage>(@room_manager);
        
        assert!(room_id < vector::length(&room_storage.rooms), E_ROOM_NOT_FOUND);
        let room = vector::borrow_mut(&mut room_storage.rooms, room_id);
        
        assert!(room.state == STATE_OPEN, E_BETTING_CLOSED);
        assert!(vector::length(&room.agents) < room.max_agents, E_INVALID_AGENT);

        // Check if developer already registered an agent
        let i = 0;
        let len = vector::length(&room.agents);
        while (i < len) {
            let agent = vector::borrow(&room.agents, i);
            assert!(agent.developer != dev_addr, E_ALREADY_REGISTERED);
            i = i + 1;
        };

        let agent_info = AgentInfo {
            agent_address,
            developer: dev_addr,
            name,
            description,
            registered_at: 0,
        };

        vector::push_back(&mut room.agents, agent_info);

        event::emit(AgentRegistered {
            room_id,
            agent_address,
            developer: dev_addr,
            name,
        });
    }

    // Place a bet on an agent
    public entry fun place_bet(
        bettor: &signer,
        room_id: u64,
        agent_address: address,
        amount: u64,
    ) acquires RoomStorage {
        let bettor_addr = signer::address_of(bettor);
        let room_storage = borrow_global_mut<RoomStorage>(@room_manager);
        
        assert!(room_id < vector::length(&room_storage.rooms), E_ROOM_NOT_FOUND);
        let room = vector::borrow_mut(&mut room_storage.rooms, room_id);
        
        assert!(room.state == STATE_OPEN || room.state == STATE_BETTING, E_BETTING_CLOSED);
        assert!(amount >= room.min_bet && amount <= room.max_bet, E_INSUFFICIENT_PAYMENT);

        // Verify agent exists
        let agent_exists = false;
        let i = 0;
        let len = vector::length(&room.agents);
        while (i < len) {
            let agent = vector::borrow(&room.agents, i);
            if (agent.agent_address == agent_address) {
                agent_exists = true;
                break
            };
            i = i + 1;
        };
        assert!(agent_exists, E_INVALID_AGENT);

        // Transfer coins to the prize pool
        let payment = coin::withdraw<AptosCoin>(bettor, amount);
        coin::merge(&mut room.prize_pool, payment);

        // Record the bet
        let bet_info = BetInfo {
            bettor: bettor_addr,
            agent_address,
            amount,
            placed_at: 0,
        };
        vector::push_back(&mut room.bets, bet_info);

        // Update state to betting if not already
        if (room.state == STATE_OPEN) {
            room.state = STATE_BETTING;
        };

        event::emit(BetPlaced {
            room_id,
            bettor: bettor_addr,
            agent_address,
            amount,
        });
    }

    // Start the competition (Admin only)
    public entry fun start_competition(
        admin: &signer,
        room_id: u64,
    ) acquires RoomStorage {
        let admin_addr = signer::address_of(admin);
        let room_storage = borrow_global_mut<RoomStorage>(@room_manager);
        
        assert!(room_id < vector::length(&room_storage.rooms), E_ROOM_NOT_FOUND);
        let room = vector::borrow_mut(&mut room_storage.rooms, room_id);
        
        assert!(room.admin == admin_addr, E_NOT_ADMIN);
        assert!(room.state == STATE_BETTING, E_COMPETITION_NOT_STARTED);

        room.state = STATE_RUNNING;

        event::emit(CompetitionStarted {
            room_id,
            total_agents: vector::length(&room.agents),
            total_bets: vector::length(&room.bets),
        });
    }

    // Declare winner and distribute prizes (Admin only)
    public entry fun declare_winner(
        admin: &signer,
        room_id: u64,
        winner_agent_address: address,
    ) acquires RoomStorage {
        let admin_addr = signer::address_of(admin);
        let room_storage = borrow_global_mut<RoomStorage>(@room_manager);
        
        assert!(room_id < vector::length(&room_storage.rooms), E_ROOM_NOT_FOUND);
        let room = vector::borrow_mut(&mut room_storage.rooms, room_id);
        
        assert!(room.admin == admin_addr, E_NOT_ADMIN);
        assert!(room.state == STATE_RUNNING, E_COMPETITION_FINISHED);

        room.winner_agent = winner_agent_address;
        room.state = STATE_FINISHED;

        // Calculate and distribute prizes
        let total_prize = coin::value(&room.prize_pool);
        let admin_fee = total_prize * 20 / 100;  // 20% to admin
        let dev_reward = total_prize * 40 / 100; // 40% to winning developer
        let bettor_reward = total_prize * 40 / 100; // 40% to winning bettor

        // Find winning developer
        let winning_developer = @0x0;
        let i = 0;
        let len = vector::length(&room.agents);
        while (i < len) {
            let agent = vector::borrow(&room.agents, i);
            if (agent.agent_address == winner_agent_address) {
                winning_developer = agent.developer;
                break
            };
            i = i + 1;
        };

        // Find winning bettor
        let winning_bettor = @0x0;
        i = 0;
        len = vector::length(&room.bets);
        while (i < len) {
            let bet = vector::borrow(&room.bets, i);
            if (bet.agent_address == winner_agent_address) {
                winning_bettor = bet.bettor;
                break
            };
            i = i + 1;
        };

        // Distribute prizes
        if (admin_fee > 0) {
            let admin_payment = coin::extract(&mut room.prize_pool, admin_fee);
            coin::deposit(admin_addr, admin_payment);
        };

        if (dev_reward > 0 && winning_developer != @0x0) {
            let dev_payment = coin::extract(&mut room.prize_pool, dev_reward);
            coin::deposit(winning_developer, dev_payment);
        };

        if (bettor_reward > 0 && winning_bettor != @0x0) {
            let bettor_payment = coin::extract(&mut room.prize_pool, bettor_reward);
            coin::deposit(winning_bettor, bettor_payment);
        };

        event::emit(WinnerDeclared {
            room_id,
            winner_agent: winner_agent_address,
            prize_distributed: total_prize,
        });
    }

    // View functions
    #[view]
    public fun get_room_count(): u64 acquires RoomStorage {
        let room_storage = borrow_global<RoomStorage>(@room_manager);
        vector::length(&room_storage.rooms)
    }

    #[view]
    public fun get_room_info(room_id: u64): (String, String, String, u8, u64) acquires RoomStorage {
        let room_storage = borrow_global<RoomStorage>(@room_manager);
        assert!(room_id < vector::length(&room_storage.rooms), E_ROOM_NOT_FOUND);
        
        let room = vector::borrow(&room_storage.rooms, room_id);
        (room.name, room.description, room.problem_statement, room.state, coin::value(&room.prize_pool))
    }

    #[view]
    public fun get_room_agents(room_id: u64): vector<AgentInfo> acquires RoomStorage {
        let room_storage = borrow_global<RoomStorage>(@room_manager);
        assert!(room_id < vector::length(&room_storage.rooms), E_ROOM_NOT_FOUND);
        
        let room = vector::borrow(&room_storage.rooms, room_id);
        room.agents
    }

    #[view]
    public fun get_room_bets(room_id: u64): vector<BetInfo> acquires RoomStorage {
        let room_storage = borrow_global<RoomStorage>(@room_manager);
        assert!(room_id < vector::length(&room_storage.rooms), E_ROOM_NOT_FOUND);
        
        let room = vector::borrow(&room_storage.rooms, room_id);
        room.bets
    }
}