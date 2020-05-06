export class LeaderBoard
{
    leaderBoardElement;

    defaultScores = [
        {name: "Noriaki Kakyoin", score: 20},
        {name: "Jotaro Kujo", score: 30},
        {name: "Guido Mista", score: 40},
        {name: "Josuke Higashikata", score: 50},
        {name: "Okuyasu Nijimura", score: 60}
    ];

    scores = [];

    constructor(leaderBoardElement) {
        const cachedScores = JSON.parse(localStorage.getItem("scores"));

        if (cachedScores) {
            this.scores = cachedScores;
        } else {
            this.scores = this.defaultScores;
        }

        this.leaderBoardElement = leaderBoardElement;
        this.scores = this.sortScores(this.scores);
        this.drawScores();
    }

    addScore(name, score) {
        this.scores = this.sortScores(this.scores);

        for (let i = 0; i < this.scores.length; i++) {
            if (score < this.scores[i].score) {
                this.scores.splice(i, 0, { name: name, score: score });
                this.scores.pop();
                break;
            }
        }

        this.drawScores();
        localStorage.setItem("scores", JSON.stringify(this.scores));
    }

    sortScores(scores) {
        return scores.sort((a, b) => a - b);
    }

    drawScores() {
        this.leaderBoardElement.innerHTML = "";

        for (let score of this.scores) {
            let row = document.createElement("tr");

            let nameCol = document.createElement("td");
            nameCol.innerText = score.name;
            row.appendChild(nameCol);

            let scoreCol = document.createElement("td");
            scoreCol.innerText = score.score;
            row.appendChild(scoreCol);

            this.leaderBoardElement.appendChild(row);
        }
    }
}