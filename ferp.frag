#version 330

#define PI 3.14159265359

in vec2 fragTexCoord;

uniform float dims;
uniform float t;

out vec4 fragcol;

float ferp(float x, float d) {
	float sq = pow(x, 2);
	float si = cos(x);
	return (1-d)*sq + d * si;
}

float terp(float x, float d) {
	return cos(x) * d;
}

void main() {
	vec2 normCoords = vec2((fragTexCoord.x-0.5)*dims, fragTexCoord.y-0.5);
	vec2 extendedCoords = normCoords * 32;
	fragcol = vec4(0, 0, 0, 1.0);
	if(t <= PI/2) {
		fragcol.rgb = extendedCoords.y > ferp(extendedCoords.x, sin(t)) ? vec3(1) : vec3(0);
	} else {
		fragcol.rgb = extendedCoords.y > terp(extendedCoords.x, sin(t)) ? vec3(1) : vec3(0);
	}
	
}
