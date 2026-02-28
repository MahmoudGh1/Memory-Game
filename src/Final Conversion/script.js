import { GameController } from "../Components/gameController.js";
// @ts-ignore
// import { bootstrap } from "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
const game = new GameController();
const imagePool = [
    "../../public/assets/images/0.jpg",
    "../../public/assets/images/1.jpg",
    "../../public/assets/images/2.jpg",
    "../../public/assets/images/3.jpg",
    "../../public/assets/images/4.jpg",
    "../../public/assets/images/5.jpg",
    "../../public/assets/images/6.jpg",
    "../../public/assets/images/7.jpg",
    "../../public/assets/images/8.jpg",
    "../../public/assets/images/9.jpg",
    "../../public/assets/images/10.jpg",
    "../../public/assets/images/11.jpg",
    "../../public/assets/images/12.jpg",
    "../../public/assets/images/13.jpg",
    "../../public/assets/images/14.jpg",
    "../../public/assets/images/15.jpg",
    "../../public/assets/images/16.jpg",
    "../../public/assets/images/17.jpg",
    "../../public/assets/images/18.jpg",
    "../../public/assets/images/19.jpg",
    "../../public/assets/images/20.jpg",
];
const modeButtons = document.querySelectorAll(".mode-btn");
modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        var _a, _b;
        const level = ((_a = btn.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "normal";
        game.startGame(level, imagePool);
    });
});
const playAgainBtn = document.querySelector("#exampleModal2 .btn-primary");
if (playAgainBtn) {
    playAgainBtn.addEventListener("click", () => {
        const modalElement = document.getElementById("exampleModal2");
        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
        modalInstance === null || modalInstance === void 0 ? void 0 : modalInstance.hide();
        game.restartGame(imagePool);
    });
}
//# sourceMappingURL=script.js.map