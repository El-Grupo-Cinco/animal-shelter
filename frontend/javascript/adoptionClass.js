export class AdoptionRequest {
    constructor(userId, animalId, adoptionTime, comment) {
        this.userId = userId;
        this.animalId = animalId;
        this.adoptionTime = adoptionTime;
        this.comment = comment;
    }

    save() {
        console.log(`save adoption request for ${this.userId}`);
    }
}

export class Adoption {
    constructor(humanName, animalName, adoptionTime, comment) {
        this.humanName = humanName;
        this.animalName = animalName;
        this.adoptionTime = adoptionTime;
        this.comment = comment;
    }

    publish() {
        const card = document.createElement("article");
        const dateDiv = document.createElement("div");
        const animalName = document.createElement("h2");
        const userName = document.createElement("h2");
        const commentList = document.createElement("ul");

        card.className = "adoption-card";

        dateDiv.textContent = this.adoptionTime;
        animalName.textContent = this.animalName;
        userName.textContent = this.humanName;
        commentList.textContent = "Comment";

        for (const comment of this.comment) {
            const li = document.createElement("li");
            li.textContent = comment;
            commentList.appendChild(li);
        }

        card.append(dateDiv, animalName, userName, commentList);

        return card;
    }
}
