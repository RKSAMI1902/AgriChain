class Block {
    constructor(index, timestamp, data, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return btoa(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), {message: "Genesis Block"}, "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newData) {
        const newBlock = new Block(
            this.chain.length,
            Date.now(),
            newData,
            this.getLatestBlock().hash
        );
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const current = this.chain[i];
            const previous = this.chain[i - 1];

            if (current.hash !== current.calculateHash()) return false;
            if (current.previousHash !== previous.hash) return false;
        }
        return true;
    }
}

let agriChain = new Blockchain();

function addBlock() {
    const crop = document.getElementById("crop").value;
    const owner = document.getElementById("owner").value;
    const location = document.getElementById("location").value;

    if (!crop || !owner || !location) {
        alert("Please fill all fields");
        return;
    }

    agriChain.addBlock({ crop, owner, location });
    alert("Block Added Successfully!");
}

function displayChain() {
    const output = document.getElementById("output");
    output.innerHTML = JSON.stringify(agriChain.chain, null, 2);
}

function validateChain() {
    alert(agriChain.isChainValid() ? "Blockchain is Valid ✅" : "Blockchain is Tampered ❌");
}