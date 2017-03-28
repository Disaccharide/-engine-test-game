window.onload = () => {

    let canvas = document.getElementById("app") as HTMLCanvasElement;
    let stage = engine.run(canvas);
    let bitmap = new engine.Bitmap();
    let image = document.createElement("img");
    image.src = "wander-icon.jpg";
    bitmap.image = image;
    stage.addChild(bitmap);

}