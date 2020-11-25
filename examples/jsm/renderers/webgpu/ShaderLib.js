const ShaderLib = {
	meshBasic: {
		vertexShader: `#version 450

		layout(location = 0) in vec3 position;
		layout(location = 1) in vec2 uv;

		layout(location = 0) out vec2 vUv;

		layout(set = 0, binding = 0) uniform ModelUniforms {
			mat4 modelMatrix;
			mat4 modelViewMatrix;
			mat3 normalMatrix;
		} modelUniforms;

		layout(set = 0, binding = 1) uniform CameraUniforms {
			mat4 projectionMatrix;
			mat4 viewMatrix;
		} cameraUniforms;

		void main(){
			vUv = uv;
			gl_Position = cameraUniforms.projectionMatrix * modelUniforms.modelViewMatrix * vec4( position, 1.0 );
		}`,
		fragmentShader: `#version 450
		layout(set = 0, binding = 2) uniform OpacityUniforms {
			float opacity;
		} opacityUniforms;

		layout(set = 0, binding = 3) uniform sampler mySampler;
		layout(set = 0, binding = 4) uniform texture2D myTexture;

		#ifdef NODE_UNIFORMS

		layout(set = 0, binding = 5) uniform NodeUniforms {
			NODE_UNIFORMS
		} nodeUniforms;

		#endif

		layout(location = 0) in vec2 vUv;
		layout(location = 0) out vec4 outColor;

		void main() {

			outColor = texture( sampler2D( myTexture, mySampler ), vUv );

			#ifdef NODE_COLOR

				/* NODE_COLOR_CODE ignore (node code group) for now */
				outColor.rgb *= NODE_COLOR;

			#endif

			#ifdef NODE_OPACITY

				outColor.a *= NODE_OPACITY;

			#endif

			outColor.a *= opacityUniforms.opacity;

		}`
	},
	pointsBasic: {
		vertexShader: `#version 450

		layout(location = 0) in vec3 position;

		layout(set = 0, binding = 0) uniform ModelUniforms {
			mat4 modelMatrix;
			mat4 modelViewMatrix;
		} modelUniforms;

		layout(set = 0, binding = 1) uniform CameraUniforms {
			mat4 projectionMatrix;
			mat4 viewMatrix;
		} cameraUniforms;

		void main(){
			gl_Position = cameraUniforms.projectionMatrix * modelUniforms.modelViewMatrix * vec4( position, 1.0 );
		}`,
		fragmentShader: `#version 450

		layout(location = 0) out vec4 outColor;

		#ifdef NODE_UNIFORMS

		layout(set = 0, binding = 2) uniform NodeUniforms {
			NODE_UNIFORMS
		} nodeUniforms;

		#endif

		void main() {

			outColor = vec4( 1.0, 0.0, 0.0, 1.0 );

			#ifdef NODE_COLOR

				outColor.rgb = NODE_COLOR;

			#endif

			#ifdef NODE_OPACITY

				outColor.a *= NODE_OPACITY;

			#endif

		}`
	},
	lineBasic: {
		vertexShader: `#version 450

		layout(location = 0) in vec3 position;

		layout(set = 0, binding = 0) uniform ModelUniforms {
			mat4 modelMatrix;
			mat4 modelViewMatrix;
		} modelUniforms;

		layout(set = 0, binding = 1) uniform CameraUniforms {
			mat4 projectionMatrix;
			mat4 viewMatrix;
		} cameraUniforms;

		void main(){
			gl_Position = cameraUniforms.projectionMatrix * modelUniforms.modelViewMatrix * vec4( position, 1.0 );
		}`,
		fragmentShader: `#version 450

		layout(location = 0) out vec4 outColor;

		void main() {
			outColor = vec4( 1.0, 0.0, 0.0, 1.0 );
		}`
	}
};

export default ShaderLib;
