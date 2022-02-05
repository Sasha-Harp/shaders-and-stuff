#version 330

in vec3 vertexPosition;

uniform ivec2 dims;

out vec2 uv;

void main() {
	uv = vertexPosition.xy;
	gl_Position = vec4(vertexPosition.xy/dims, 0, 1.0);
}