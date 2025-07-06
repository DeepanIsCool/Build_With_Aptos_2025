module agent_template::solver {
    use std::string::{Self, String};
    use std::signer;

    // Agent information
    struct Agent has key {
        owner: address,
        name: String,
        description: String,
        version: String,
        created_at: u64,
    }

    // Agent solution result
    struct Solution has store, copy, drop {
        problem_input: String,
        solution_output: String,
        solved_at: u64,
        confidence: u8, // 0-100 confidence score
    }

    // Error codes
    const E_NOT_OWNER: u64 = 1;
    const E_AGENT_NOT_FOUND: u64 = 2;
    const E_INVALID_CONFIDENCE: u64 = 3;

    // Initialize agent
    public entry fun initialize_agent(
        owner: &signer,
        name: String,
        description: String,
        version: String,
    ) {
        let owner_addr = signer::address_of(owner);
        
        let agent = Agent {
            owner: owner_addr,
            name,
            description,
            version,
            created_at: 0, // In production, use timestamp
        };
        
        move_to(owner, agent);
    }

    // Solve a problem (main function called by competition)
    public entry fun solve_problem(
        problem_input: String,
        agent_address: address,
    ): Solution acquires Agent {
        assert!(exists<Agent>(agent_address), E_AGENT_NOT_FOUND);
        
        // This is where the actual AI logic would go
        // For demo purposes, we'll simulate different solutions
        let solution_output = generate_solution(problem_input);
        let confidence = calculate_confidence(problem_input);
        
        Solution {
            problem_input,
            solution_output,
            solved_at: 0,
            confidence,
        }
    }

    // Generate solution based on problem input
    // This is a simplified version - in reality, this would call AI models
    fun generate_solution(problem_input: String): String {
        // Simple demo logic - different agents could have different approaches
        if (string::length(&problem_input) > 20) {
            string::utf8(b"Complex solution with multiple steps: Step 1, Step 2, Step 3")
        } else {
            string::utf8(b"Simple solution: Direct approach")
        }
    }

    // Calculate confidence score (0-100)
    fun calculate_confidence(problem_input: String): u8 {
        // Simple heuristic for demo
        let length = string::length(&problem_input);
        if (length < 10) {
            95 // High confidence for simple problems
        } else if (length < 50) {
            75 // Medium confidence
        } else {
            60 // Lower confidence for complex problems
        }
    }

    // Update agent information
    public entry fun update_agent(
        owner: &signer,
        name: String,
        description: String,
        version: String,
    ) acquires Agent {
        let owner_addr = signer::address_of(owner);
        assert!(exists<Agent>(owner_addr), E_AGENT_NOT_FOUND);
        
        let agent = borrow_global_mut<Agent>(owner_addr);
        assert!(agent.owner == owner_addr, E_NOT_OWNER);
        
        agent.name = name;
        agent.description = description;
        agent.version = version;
    }

    // View functions
    #[view]
    public fun get_agent_info(agent_address: address): (String, String, String, address) acquires Agent {
        assert!(exists<Agent>(agent_address), E_AGENT_NOT_FOUND);
        let agent = borrow_global<Agent>(agent_address);
        (agent.name, agent.description, agent.version, agent.owner)
    }

    #[view]
    public fun agent_exists(agent_address: address): bool {
        exists<Agent>(agent_address)
    }

    // Test function to verify agent can solve problems
    #[view]
    public fun test_solve(problem_input: String, agent_address: address): (String, u8) acquires Agent {
        let solution = solve_problem(problem_input, agent_address);
        (solution.solution_output, solution.confidence)
    }
}