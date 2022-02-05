#include <raylib.h>
#include "Definitions.h"
#include "Scene.h"
#include "FirstScene.h"
#include <iostream>

int main(void) {

    //INIT
    InitWindow(WIDTH, HEIGHT, "First test game!");
    float wh = (float)WIDTH / (float)HEIGHT;
    FirstScene currentScene = FirstScene();
    Shader shader = LoadShader(0, TextFormat("player.frag", 330));
    int shader_t = GetShaderLocation(shader, "t");
    int shader_dims = GetShaderLocation(shader, "dims");
    SetShaderValue(shader, shader_dims, &wh, SHADER_UNIFORM_FLOAT);
    RenderTexture2D target = LoadRenderTexture(WIDTH, HEIGHT);

    std::cout << GetScreenWidth() << std::endl;

    float t = 0;

    //GAMELOOP
    while (!WindowShouldClose()) {
        float dt = GetFrameTime();
        t += dt;
        SetShaderValue(shader, shader_t, &t, SHADER_UNIFORM_FLOAT);

        currentScene.Update(dt);

        BeginTextureMode(target);
        {
            ClearBackground(BLACK);
            DrawRectangle(0, 0, WIDTH, HEIGHT, BLACK);
        } EndTextureMode();

        BeginTextureMode(target);
        {
            BeginShaderMode(shader);
            DrawTextureEx(target.texture, { 0.0f, 0.0f }, 0, 1.0f, WHITE);
            EndShaderMode();
        } EndTextureMode();

        BeginDrawing(); {
            ClearBackground(BLACK);
            currentScene.Draw(dt);
            DrawTextureEx(target.texture, { 0.0f, 0.0f }, 0, 1.0f, WHITE);
            DrawText(TextFormat("%f", t/10.0), 32, 32, 20, RAYWHITE);
        } EndDrawing();
    }
}