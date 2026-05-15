"use strict";(self.webpackChunkluau2ts_com=self.webpackChunkluau2ts_com||[]).push([["164"],{4825(e,t,a){a.d(t,{A:()=>n});var s=a(1325);a(489);var r=a(1626);function n({children:e,fallback:t}){return(0,r.A)()?(0,s.jsx)(s.Fragment,{children:e?.()}):t??null}},6882(e,t,a){a.r(t),a.d(t,{default:()=>T});var s=a(1325),r=a(489),n=a(383);let l="pane_ZPzd",i="paneHeader_vQW2",o="@rbxts",u=["types","compiler-types"],c=/\/\/\/\s*<reference path=["']([^"']+)["']\s*\/>/g,d=/\/\/\/\s*<reference types=["']@rbxts\/([^"']+)["']\s*\/>/g,p=/(?:import|export)\s+.+\s+from\s+['"]([^'"]+)['"]/g;function m(e){let t=e.lastIndexOf("/");return t<0?"":e.slice(0,t)}function h(e,t){if(t.startsWith("/"))return t;let a=(e+"/"+t).split("/"),s=[];for(let e of a)""!==e&&"."!==e&&(".."===e?s.pop():s.push(e));return"/"+s.join("/")}function f(e,t){let a=[];for(let s of t.matchAll(e))a.push(s[1]);return a}async function x(e){let t=e.split("/");return t[1]&&!t[1].includes("@")&&(t[1]=`${t[1]}@latest`),fetch(`https://cdn.jsdelivr.net/npm/${t.join("/")}`)}function g(e,t,a){e.worker.postMessage({type:"writeFile",filePath:`/node_modules/${t}`,content:a})}async function j(e,t,a){if(e.loaded.has(a))return;e.loaded.add(a);let s=await x(a);if(404===s.status&&(a=a.slice(0,-5)+"/index.d.ts",s=await x(a)),200!==s.status)return;let r=await s.text(),n=[];for(let s of f(c,r)){let r=h(m(a),s).slice(1);n.push(j(e,t,r))}for(let s of f(p,r))if((s.endsWith(".")||s.endsWith(".."))&&(s+="/index"),s.startsWith(o))n.push(y(e,s.slice(o.length+1)));else{let r=h(m(a),s).slice(1)+".d.ts";n.push(j(e,t,r))}for(let t of f(d,r))n.push(y(e,t));g(e,a,r),await Promise.allSettled(n)}async function y(e,t){if(e.packages.has(t))return;e.packages.add(t);let a=`${o}/${t}`,s=`${a}/package.json`,r=await x(s);if(200!==r.status)return void e.packages.delete(t);let n=await r.json();g(e,s,JSON.stringify(n));let l=h(`/${a}`,n.main??"").slice(1),i=h(`/${a}`,n.types??n.typings??"index.d.ts").slice(1);e.worker.postMessage({type:"setMapping",typingsPath:`/node_modules/${i}`,mainPath:`/node_modules/${l}`}),await j(e,a,i)}async function v(e){let t={worker:e,loaded:new Set,packages:new Set};await Promise.all(u.map(e=>y(t,e)))}let w=`local Workspace = game:GetService("Workspace")
local Players = game:GetService("Players")

local Animal = setmetatable({}, {})
Animal.__index = Animal

function Animal.new(name)
    local self = setmetatable({}, Animal)
    self:constructor(name)
    return self
end

function Animal:constructor(name)
    self.name = name
    self.health = 100
end

function Animal:greet()
    return "Hello, " .. self.name
end

local function spawnPart(position: Vector3)
    local part = Instance.new("Part")
    part.Position = position + Vector3.new(0, 5, 0)
    part.Size = Vector3.new(2, 2, 2)
    part.Color = Color3.fromRGB(255, 100, 100)
    part.Parent = Workspace
    return part
end

local animals = {}
for i = 1, 3 do
    table.insert(animals, Animal.new("animal" .. tostring(i)))
end

for _, a in ipairs(animals) do
    print(a:greet())
end
`,b=`class Animal {
    health = 100;
    constructor(public name: string) {}
    greet(): string {
        return \`Hello, \${this.name}\`;
    }
}

const animals: Animal[] = [];
for (let i = 1; i <= 3; i++) {
    animals.push(new Animal(\`animal\${i}\`));
}

for (const a of animals) {
    print(a.greet());
}
`;function T(){let e=function(){let[e,t]=(0,r.useState)("light");return(0,r.useEffect)(()=>{let e=document.documentElement,a=()=>{t("dark"===e.getAttribute("data-theme")?"dark":"light")};a();let s=new MutationObserver(a);return s.observe(e,{attributes:!0,attributeFilter:["data-theme"]}),()=>s.disconnect()},[]),e}(),[t,l]=(0,r.useState)(w),[i,o]=(0,r.useState)(b),[u,c]=(0,r.useState)("rbxts"),[d,p]=(0,r.useState)("luauToTs"),[m,h]=(0,r.useState)(""),[f,x]=(0,r.useState)([]),[g,j]=(0,r.useState)(!1),[y,T]=(0,r.useState)("idle"),N=(0,r.useRef)(null),L=(0,r.useRef)(null),A=(0,r.useRef)(null);async function $(){if("luauToTs"===d){let e=N.current;if(e){j(!0);try{let a=await e.compile(t,{compatMode:u});h(a.source),x(a.errors??[])}catch(e){x([{message:e.message}]),h("")}finally{j(!1)}}}else{let e=L.current;if(!e||"ready"!==y)return;j(!0),e.postMessage({type:"compile",source:i})}}(0,r.useEffect)(()=>{let e=!1;return(async()=>{try{let t=await Promise.all([a.e("847"),a.e("202")]).then(a.bind(a,2641));e||(N.current=t),e||"luauToTs"!==d||$()}catch(t){e||x([{message:`Failed to load Luau\u{2192}TS compiler: ${t.message}`}])}})(),()=>{e=!0}},[]),(0,r.useEffect)(()=>{if("tsToLuau"!==d)return;if(L.current&&"ready"===y)return void $();if("loading"===y)return;T("loading");let e=!1;return(async()=>{try{let t=new Worker("/rbxts-worker.js");if(t.addEventListener("message",e=>{e.data?.type==="compiled"&&(h(e.data.source),x(e.data.ok?[]:[{message:"roblox-ts compile errors (see output)"}]),j(!1))}),t.addEventListener("error",e=>{x([{message:`Worker error: ${e.message??"unknown"}`}]),T("error"),j(!1)}),L.current=t,await v(t),e)return;T("ready"),$()}catch(t){e||(x([{message:`Failed to spawn TS\u{2192}Luau worker: ${t.message}`}]),T("error"))}})(),()=>{e=!0}},[d]),(0,r.useEffect)(()=>()=>{L.current?.terminate()},[]),(0,r.useEffect)(()=>(A.current&&clearTimeout(A.current),A.current=setTimeout(()=>{$()},150),()=>{A.current&&clearTimeout(A.current)}),[t,i,u,d,y]);let M="dark"===e?n.Zj.dracula:n.Zj.github,P="tsToLuau"===d,W=P?i:t;return(0,s.jsxs)("div",{className:"root_oAx2",children:[(0,s.jsxs)("div",{className:"toolbar_FTq7",children:[(0,s.jsxs)("h1",{className:"title_Nfa7",children:[P?"TypeScript \u2192 Luau":"Luau \u2192 TypeScript"," playground"]}),(0,s.jsxs)("div",{className:"controls_hnU5",children:[!P&&(0,s.jsxs)("label",{className:"modeLabel_Li0e",children:[(0,s.jsx)("span",{children:"Compat mode:"}),(0,s.jsxs)("select",{value:u,onChange:e=>c(e.target.value),className:"select_MIap",children:[(0,s.jsx)("option",{value:"native",children:"native (luau2ts/runtime)"}),(0,s.jsx)("option",{value:"rbxts",children:"rbxts (@rbxts/* shim)"})]})]}),(0,s.jsx)("span",{className:"busy_j2FR",children:P&&"loading"===y?"loading roblox-ts + @rbxts/types\u2026":g?"compiling\u2026":""})]})]}),(0,s.jsxs)("div",{className:"panes_olFc",children:[(0,s.jsx)(k,{source:W,label:P?"TypeScript source":"Luau source",lang:P?"tsx":"lua",onChange:P?o:l,prismTheme:M}),(0,s.jsx)("button",{type:"button",onClick:()=>p(e=>"luauToTs"===e?"tsToLuau":"luauToTs"),className:"swap_x44F","aria-label":"Swap direction",title:P?"Switch to Luau \u2192 TypeScript":"Switch to TypeScript \u2192 Luau (loads roblox-ts in a worker)",children:(0,s.jsx)(_,{})}),(0,s.jsx)(S,{output:m,label:P?"Luau output":"TypeScript output",lang:P?"lua":"tsx",errors:f,prismTheme:M})]})]})}function k({source:e,label:t,lang:a,onChange:n,prismTheme:o}){let u=(0,r.useRef)(null),c=(0,r.useRef)(null),d=(0,r.useMemo)(()=>Math.max(1,e.split("\n").length),[e]);return(0,s.jsxs)("div",{className:l,children:[(0,s.jsx)("div",{className:i,children:t}),(0,s.jsxs)("div",{className:"editorWrap_an2x",children:[(0,s.jsx)("div",{className:"editorGutter_NWp0",ref:c,"aria-hidden":!0,children:Array.from({length:d},(e,t)=>(0,s.jsx)("div",{className:"editorGutterLine_Exzz",children:t+1},t))}),(0,s.jsx)("textarea",{ref:u,value:e,onChange:e=>n(e.target.value),onScroll:function(){c.current&&u.current&&(c.current.scrollTop=u.current.scrollTop)},spellCheck:!1,className:"editor_TLlF","aria-label":t})]}),(0,s.jsxs)("span",{style:{display:"none"},children:[a,o.plain?.color??""]})]})}function S({output:e,label:t,lang:a,errors:r,prismTheme:n}){return(0,s.jsxs)("div",{className:l,children:[(0,s.jsx)("div",{className:i,children:t}),(0,s.jsx)(N,{source:e,lang:a,prismTheme:n}),r.length>0&&(0,s.jsx)("div",{className:"errors_GbBP",children:r.map((e,t)=>(0,s.jsxs)("div",{className:"errorRow_vLpB",children:[e.loc?`line ${e.loc.start.line+1}: `:"",e.message]},t))})]})}function _(){return(0,s.jsxs)("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:[(0,s.jsx)("path",{d:"M7 16V4M7 4L3 8M7 4l4 4"}),(0,s.jsx)("path",{d:"M17 8v12M17 20l-4-4M17 20l4-4"})]})}function N({source:e,lang:t,prismTheme:a}){return(0,s.jsx)(n.f4,{code:e,language:t,theme:a,children:({className:e,style:t,tokens:a,getLineProps:r,getTokenProps:n})=>(0,s.jsx)("pre",{className:`${e} output_KJb5`,style:t,children:a.map((e,t)=>(0,s.jsxs)("div",{...r({line:e}),children:[(0,s.jsx)("span",{className:"lineNum_BdmQ",children:t+1}),e.map((e,t)=>(0,s.jsx)("span",{...n({token:e})},t))]},t))})})}},4662(e,t,a){a.r(t),a.d(t,{default:()=>l});var s=a(1325),r=a(4825),n=a(1372);function l(){return(0,s.jsx)(n.A,{title:"Playground",description:"Compile Luau to TypeScript live, with native and roblox-ts compat modes.",children:(0,s.jsx)(r.A,{fallback:(0,s.jsx)("div",{style:{padding:"2rem"},children:"Loading playground\u2026"}),children:()=>{let e=a(6882).default;return(0,s.jsx)(e,{})}})})}}}]);