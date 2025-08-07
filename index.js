import { UltraHonkBackend } from '@aztec/bb.js';
import { Noir } from '@noir-lang/noir_js';
import hello_noir from "./target/hello_noir.json";


const show = (id, content) => {
    const container = document.getElementById(id);
    container.appendChild(document.createTextNode(content));
    container.appendChild(document.createElement("br"));
   };
   
   document.getElementById("submit").addEventListener("click", async () => {
    try {
        const noir = new Noir(hello_noir);
        const backend = new UltraHonkBackend(hello_noir.bytecode);
        
        const age = document.getElementById("age").value;
        const min_age = document.getElementById("min_age").value;
        
        show("logs", "minimum age: " + min_age);
        show("logs", "age: " + age);

        show("logs", "Generating witness... ⏳");
        const { witness } = await noir.execute({ age, min_age });
        show("logs", "Generated witness... ✅");

        show("logs", "Generating proof... ⏳");
        const proof = await backend.generateProof(witness);
        show("logs", "Generated proof... ✅");        
        show("results", proof.proof);
        
        show('logs', 'Verifying proof... ⌛');
        const isValid = await backend.verifyProof(proof);
        show("logs", `Proof is ${isValid ? "valid" : "invalid"}... ✅`);
    } catch (e) {
        show("logs", `❌ Error: ${e.message || e}`);
    }
   });