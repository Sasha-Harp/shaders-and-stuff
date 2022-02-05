#include <raylib.h>
#include "FirstScene.h"

FirstScene::FirstScene() {
}

FirstScene::~FirstScene() {
}

void FirstScene::Update(float dt) {
}

void FirstScene::Draw(float dt) {
	DrawText("test", 32, 32, 20, RAYWHITE);
}
