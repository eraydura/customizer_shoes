import {Suspense,useState,useRef, useEffect} from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls,useGLTF,Environment, ContactShadows,useTexture } from '@react-three/drei';


function Model(props) {

  const { nodes, materials } = useGLTF('./gltf/shoe.gltf')
  return (
    <group {...props} >
      <mesh material-metalness={1.0} material-roughness={1.0} geometry={nodes.shoe.geometry} material={materials.laces} material-color={props.customColors.stripes}>  <meshStandardMaterial map={useTexture(props.customColors.stripestexture)} /></mesh>
      <mesh material-metalness={1.0} material-roughness={1.0} geometry={nodes.shoe_1.geometry} material={materials.mesh}  material-color={props.customColors.mesh}>     <meshStandardMaterial map={useTexture(props.customColors.meshtexture)} /></mesh>
      <mesh material-metalness={1.0} material-roughness={1.0} geometry={nodes.shoe_2.geometry} material={materials.caps}  material-color={props.customColors.soul}>     <meshStandardMaterial map={useTexture(props.customColors.soultexture)} /></mesh>
      <mesh material-metalness={1.0} material-roughness={1.0} geometry={nodes.shoe_3.geometry} material={materials.inner} material-color={props.customColors.soul} >     <meshStandardMaterial map={useTexture(props.customColors.soultexture)} /></mesh>
      <mesh material-metalness={1.0} material-roughness={1.0} geometry={nodes.shoe_4.geometry} material={materials.sole} material-color={props.customColors.soul}>     <meshStandardMaterial map={useTexture(props.customColors.soultexture)} /></mesh>
      <mesh material-metalness={1.0} material-roughness={1.0} geometry={nodes.shoe_5.geometry} material={materials.stripes} material-color={props.customColors.stripes}>  <meshStandardMaterial map={useTexture(props.customColors.stripestexture)} /></mesh>
      <mesh material-metalness={1.0} material-roughness={1.0} geometry={nodes.shoe_6.geometry} material={materials.band} material-color={props.customColors.stripes}>  <meshStandardMaterial map={useTexture(props.customColors.stripestexture)} /></mesh>
      <mesh material-metalness={1.0} material-roughness={1.0}  geometry={nodes.shoe_7.geometry} material={materials.patch} material-color={props.customColors.soul}>     <meshStandardMaterial map={useTexture(props.customColors.soultexture)} /></mesh>
    </group>
  )
}

function App() {
  const texture = ["./gltf/textures/Empty.png","./gltf/textures/texture1.jpg", "./gltf/textures/texture.jpg", "./gltf/textures/texture2.jpg",  "./gltf/textures/texture3.jpg", "./gltf/textures/texture1.jpg"];

  const [mesh,setMesh] = useState("#ffffff")
  const [index,setIndex] = useState(0)
  const [stripe,setStripes] = useState("#ffffff")
  const [soul,setSoul] = useState("#ffffff")
  const [part,setPart] = useState("mesh");
  const [meshtexture,setMeshTexture] = useState(texture[index])
  const [stripestexture,setStripesTexture] = useState(texture[index])
  const [soultexture,setSoulTexture] = useState(texture[index])

  function dropDownChanged(e) {
    if (e.target.value === "1") {
      setPart("mesh");
    }else if(e.target.value === "2"){
      setPart("stripes");
    }else{
      setPart("soul");
    }
  }

  function next(){
    if(index<4){
      setIndex(index+1);
    }
  }

  function prev(){
    if(index-1>0){
      setIndex(index-1);
    }
  }



  useEffect(() => {
    if(part==="stripes"){
      setStripesTexture(texture[index]);
    }else if(part==="mesh"){
      setMeshTexture(texture[index]);
    }else if(part==="soul") {
      setSoulTexture(texture[index]);
    }
  },[index,part]);

  return (
    <div className="App">
      <div className="wrapper">
            <div className="card">
                <div className="product-canvas">
                <Canvas shadows camera={{ position: [0, 0, 1.66] }}>
                      <Suspense fallback={null}>
                      <Environment files="https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@gltfjsx/public/img/forest_slope_1k.hdr" />
                        <ambientLight>
                          <spotLight intensity={0.9} angle={0.1} penumbra={1} position={[10,15,10]} castShadow></spotLight>
                          <Model customColors={{mesh:mesh, stripes:stripe , soul:soul, meshtexture:meshtexture, stripestexture:stripestexture , soultexture:soultexture }}/>
                        </ambientLight>
                        <ContactShadows opacity={0.5} scale={5}  blur={5} position={[0, -0.5, 0]} resolution={2048} color="#ffffff" />
                        <OrbitControls autoRotate />
                      </Suspense>
                   </Canvas>
                </div>
            </div>
            <div className='colors'>
              <div>
                <span>Color Select</span>
                <div className='image2'>
                  {(() => {
                    if (part==="mesh") {
                      return (
                            <input type="color" className='colorselect' id="mesh" name="mesh" value={mesh} onChange={(e) => setMesh(e.target.value)}/>
                      )
                    } else if (part==="stripes") {
                      return (
                           <input type="color" className='colorselect'  id="stripes" name="stripes" value={stripe} onChange={(e) => setStripes(e.target.value)}/>
                      )
                    } else {
                      return (
                           <input type="color" className='colorselect' id="soul" name="soul" value={soul} onChange={(e) => setSoul(e.target.value)}/>
                      )
                    }
                  })()}
                  </div>
              </div>

                  <span className="divider" />
                  <div>
                    <span>Texture Select</span>
                  <div className='image'>
                           <img onClick={prev} src="https://thenounproject.com/api/private/icons/3554040/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0"/>
                           {(() => {
                              if (index-1>=0) {
                                return (
                                  <img src={texture[(index-1)%texture.length]}/>
                                )
                              } 
                              else {
                                return (
                                  <img src={"./gltf/textures/Empty.png"}/>
                                )
                              }
                            })()}
                           <img src={texture[ (index)%texture.length] }/>
                           {(() => {
                              if ((index+1)%texture.length!=texture.length-1) {
                                return (
                                  <img src={texture[(index+1)%texture.length ]}/>
                                )
                              } 
                              else {
                                return (
                                  <img src={"./gltf/textures/Empty.png"}/>
                                )
                              }
                            })()}
                           <img onClick={next} src="https://thenounproject.com/api/private/icons/3551157/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0"/>
                  </div>
                  </div>
                  
                      <div className='dropdown'>
                          <select onChange={e => dropDownChanged(e)} >
                            <option value="1">Base</option>
                            <option value="2">Stripes</option>
                            <option value="3">Soul</option>
                          </select>
                      </div>
                </div>
        </div>
    </div>
  );
}

export default App;
