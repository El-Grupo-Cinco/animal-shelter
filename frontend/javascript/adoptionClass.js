export class AdoptionRequest {
    constructor(userId, animalId, adoptionTime, comments) {
        this.userId = userId;
        this.animalId = animalId;
        this.adoptionTime = adoptionTime;
        this.comments = comments;
    }

    save() {
        console.log(`save adoption request for ${this.userId}`);
    }
}

export class Adoption {
    constructor(humanName, animalName, adoptionTime, comments) {
        this.humanName = humanName;
        this.animalName = animalName;
        this.adoptionTime = adoptionTime;
        this.comments = comments;
    }

    publish() {
        const card = document.createElement("article");
        const dateDiv = document.createElement("div");
        const animalName = document.createElement("h2");
        const userName = document.createElement("h2");
        const commentList = document.createElement("ul");

        card.className = "adoption-card";

        dateDiv.textContent = this.adoptionTime;
        userName.textContent = this.humanName;
        animalName.textContent = this.animalName;
        commentList.textContent = "Comments";

        for (const comment of this.comments) {
            const listItem = document.createElement("li");
            listItem.textContent = comment;
            commentList.append(listItem);
        }

        card.append(dateDiv, animalName, userName, commentList);

        return card;
    }
}
