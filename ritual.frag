#version 330

#define PI 3.14159265359

in vec2 fragTexCoord;

uniform float dims;
uniform float t;

out vec4 fragcol;

bool wave(float x, float y, float d, float s) {
	return abs(pow(x/3, 2)+pow(y, 2)-pow(d, 2)) < (d < 2 ? d/2.0 : s);
}
int waveup(float x, float y, float d, float s, int n) {
	for(int nn = 1; nn <= n; nn++)
		if(abs(pow(x/3, 2)+pow(y-nn/8.0, 2)-pow(d, 2)) < (d < 2 ? d/2.0 : s))
			return nn;
	return 0;
}

float zigzag(float x, float rp) {
	float xp = x*rp;
	return 2*abs(xp - floor(xp+0.5));
}

void main() {
	vec2 normCoords = vec2((fragTexCoord.x-0.5)*dims, fragTexCoord.y-0.5);
	vec2 extendedCoords = normCoords * 128;
	fragcol = vec4(0, 0, 0, 1.0);
	if(t <= 1.2) {
		if(extendedCoords.x < 0.5 && extendedCoords.x > -0.5 && abs(extendedCoords.y - (128 - t*128)) < 1)
			fragcol.rgb = vec3(1);
	} else if (t <= 10) {
		if(wave(extendedCoords.x, extendedCoords.y + 25.6, (t-1.2)*2, 1))
			fragcol.rgb = vec3(0.7);
		if(t > 2.4 && wave(extendedCoords.x, extendedCoords.y + 25.6, (t-2.4)*2, 1))
			fragcol.rgb = vec3(0.35);
		if(t > 3.6 && wave(extendedCoords.x, extendedCoords.y + 25.6, (t-3.6)*2, 1))
			fragcol.rgb = vec3(0.175);
		if(t > 4.8 && wave(extendedCoords.x, extendedCoords.y + 25.6, (t-4.8)*2, 1))
			fragcol.rgb = vec3(0.0875);
	} else if (t <= 12) {
		if(wave(extendedCoords.x, extendedCoords.y + 25.6, 17.6 + zigzag(t, 8)/6, 1+(t-10)/2))
			fragcol.rgb = vec3(0.7 + 0.3 * (t-10)/2);
		if(wave(extendedCoords.x, extendedCoords.y + 25.6, 15.2 + zigzag(t, 8)/6, 1+(t-10)/2))
			fragcol.rgb = vec3(0.35 + 0.15 * (t-10)/2);
		if(wave(extendedCoords.x, extendedCoords.y + 25.6, 12.8 + zigzag(t, 8)/6, 1+(t-10)/2))
			fragcol.rgb = vec3(0.175 + 0.075 * (t-10)/2);
		if(wave(extendedCoords.x, extendedCoords.y + 25.6, 10.4 + zigzag(t, 8)/6, 1+(t-10)/2))
			fragcol.rgb = vec3(0.0875 + 0.0375 * (t-10)/2);
	} else if (t <= 32) {
		int height = int(1+(t-12)*5);
		if (height <= 40){
			 if (t > 17 && t <= 19.2) {
				if(wave(extendedCoords.x, extendedCoords.y + 25.6, (t-17)*8, 1))
					fragcol.rgb = vec3(1.0, 0.2, 0.2);
			}
			if(t < 19.2 && wave(extendedCoords.x, extendedCoords.y + 25.6, 17.6 + zigzag(t, 8)/6, 2))
				fragcol.rgb = vec3(1);
			if(t < 18.9 && wave(extendedCoords.x, extendedCoords.y + 25.6, 15.2 + zigzag(t, 8)/6, 2))
				fragcol.rgb = vec3(0.5);
			if(t < 18.6 && wave(extendedCoords.x, extendedCoords.y + 25.6, 12.8 + zigzag(t, 8)/6, 2))
				fragcol.rgb = vec3(0.25);
			if(t < 18.3 && wave(extendedCoords.x, extendedCoords.y + 25.6, 10.4 + zigzag(t, 8)/6, 2))
				fragcol.rgb = vec3(0.125);
			int w = waveup(extendedCoords.x, extendedCoords.y + 25.6, 10.4 + zigzag(t, 8)/6, 2, height);
			if(w != 0)
				fragcol.rgb = t < 18.3 ? vec3(0.125 * (w-height)/(1-height)) : vec3(0.125 * (w-height)/(1-height), 0.05 * (w-height)/(1-height), 0.05 * (w-height)/(1-height));
			w = waveup(extendedCoords.x, extendedCoords.y + 25.6, 12.8 + zigzag(t, 8)/6, 2, height);
			if(w != 0)
				fragcol.rgb = t < 18.6 ? vec3(0.25 * (w-height)/(1-height)) : vec3(0.25 * (w-height)/(1-height), 0.1 * (w-height)/(1-height), 0.1 * (w-height)/(1-height));
			w = waveup(extendedCoords.x, extendedCoords.y + 25.6, 15.2 + zigzag(t, 8)/6, 2, height);
			if(w != 0)
				fragcol.rgb = t < 18.9 ? vec3(0.5 * (w-height)/(1-height)) : vec3(0.5 * (w-height)/(1-height), 0.15 * (w-height)/(1-height), 0.15 * (w-height)/(1-height));
			w = waveup(extendedCoords.x, extendedCoords.y + 25.6, 17.6 + zigzag(t, 8)/6, 2, height);
			if(w != 0)
				fragcol.rgb = t < 19.2 ? vec3(1.0 * (w-height)/(1.0-height)) : vec3(1.0 * (w-height)/(1.0 -height), 0.2 * (w-height)/(1-height), 0.2 * (w-height)/(1-height));
			if(height > 20 && extendedCoords.x < 0.5 && extendedCoords.x > -0.5 && abs(extendedCoords.y - (128 - (t-15.8)*128)) < 1 && t <= 17)
				fragcol.rgb = vec3(1.0, 0.2, 0.2);
		} else {
			height = 40;
			int w = waveup(extendedCoords.x, extendedCoords.y + 25.6, 10.4 + zigzag(t, 8)/6, 2, height);
			if(w != 0)
				fragcol.rgb = vec3(0.125 * (w-height)/(1-height), 0.05 * (w-height)/(1-height), 0.05 * (w-height)/(1-height));
			w = waveup(extendedCoords.x, extendedCoords.y + 25.6, 12.8 + zigzag(t, 8)/6, 2, height);
			if(w != 0)
				fragcol.rgb = vec3(0.25 * (w-height)/(1-height), 0.1 * (w-height)/(1-height), 0.1 * (w-height)/(1-height));
			w = waveup(extendedCoords.x, extendedCoords.y + 25.6, 15.2 + zigzag(t, 8)/6, 2, height);
			if(w != 0)
				fragcol.rgb = vec3(0.5 * (w-height)/(1-height), 0.15 * (w-height)/(1-height), 0.15 * (w-height)/(1-height));
			w = waveup(extendedCoords.x, extendedCoords.y + 25.6, 17.6 + zigzag(t, 8)/6, 2, height);
			if(w != 0)
				fragcol.rgb = vec3(1.0 * (w-height)/(1.0 -height), 0.2 * (w-height)/(1-height), 0.2 * (w-height)/(1-height));
		}
		if (t >= 25) {
			if (abs(extendedCoords.x) <= (t-25)*30) {
				fragcol.rgb = vec3(1.0, 0.15, 0.15);
			}
		}
	}
}