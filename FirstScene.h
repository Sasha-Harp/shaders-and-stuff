#pragma once
#include "Scene.h"
class FirstScene : public Scene {
public:
	FirstScene();
	~FirstScene();

	virtual void Update(float dt) override;
	virtual void Draw(float dt) override;
};

