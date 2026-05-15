"use strict";(self.webpackChunkluau2ts_com=self.webpackChunkluau2ts_com||[]).push([["164"],{4825(e,r,t){t.d(r,{A:()=>s});var a=t(1325);t(489);var n=t(1626);function s({children:e,fallback:r}){return(0,n.A)()?(0,a.jsx)(a.Fragment,{children:e?.()}):r??null}},6882(e,r,t){t.r(r),t.d(r,{default:()=>M});var a=t(1325),n=t(489),s=t(383);let o="modeLabel_Li0e",i="select_MIap",l="pane_ZPzd",c="paneHeader_vQW2",u="@rbxts",m=["types","compiler-types"],p=/\/\/\/\s*<reference path=["']([^"']+)["']\s*\/>/g,d=/\/\/\/\s*<reference types=["']@rbxts\/([^"']+)["']\s*\/>/g,f=/(?:import|export)\s+.+\s+from\s+['"]([^'"]+)['"]/g;function b(e){let r=e.lastIndexOf("/");return r<0?"":e.slice(0,r)}function h(e,r){if(r.startsWith("/"))return r;let t=(e+"/"+r).split("/"),a=[];for(let e of t)""!==e&&"."!==e&&(".."===e?a.pop():a.push(e));return"/"+a.join("/")}function g(e,r){let t=[];for(let a of r.matchAll(e))t.push(a[1]);return t}async function w(e){let r=e.split("/");return r[1]&&!r[1].includes("@")&&(r[1]=`${r[1]}@latest`),fetch(`https://cdn.jsdelivr.net/npm/${r.join("/")}`)}function x(e,r,t){e.worker.postMessage({type:"writeFile",filePath:`/node_modules/${r}`,content:t})}async function y(e,r,t){if(e.loaded.has(t))return;e.loaded.add(t);let a=await w(t);if(404===a.status&&(t=t.slice(0,-5)+"/index.d.ts",a=await w(t)),200!==a.status)return;let n=await a.text(),s=[];for(let a of g(p,n)){let n=h(b(t),a).slice(1);s.push(y(e,r,n))}for(let a of g(f,n))if((a.endsWith(".")||a.endsWith(".."))&&(a+="/index"),a.startsWith(u))s.push(v(e,a.slice(u.length+1)));else{let n=h(b(t),a).slice(1)+".d.ts";s.push(y(e,r,n))}for(let r of g(d,n))s.push(v(e,r));x(e,t,n),await Promise.allSettled(s)}async function v(e,r){if(e.packages.has(r))return;e.packages.add(r);let t=`${u}/${r}`,a=`${t}/package.json`,n=await w(a);if(200!==n.status)return void e.packages.delete(r);let s=await n.json();x(e,a,JSON.stringify(s));let o=h(`/${t}`,s.main??"").slice(1),i=h(`/${t}`,s.types??s.typings??"index.d.ts").slice(1);e.worker.postMessage({type:"setMapping",typingsPath:`/node_modules/${i}`,mainPath:`/node_modules/${o}`}),await y(e,t,i)}async function j(e){let r={worker:e,loaded:new Set,packages:new Set};await Promise.all(m.map(e=>v(r,e)))}let k=[{name:"Animal class",luau:`local Animal = setmetatable({}, {})
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

local animals = {}
for i = 1, 3 do
	table.insert(animals, Animal.new("animal" .. tostring(i)))
end

for _, a in ipairs(animals) do
	print(a:greet())
end
`,ts:`class Animal {
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
`},{name:"Services and Instances",luau:`local Workspace = game:GetService("Workspace")
local Players = game:GetService("Players")

local function spawnPart(position: Vector3, color: Color3)
	local part = Instance.new("Part")
	part.Position = position + Vector3.new(0, 5, 0)
	part.Size = Vector3.new(2, 2, 2)
	part.Color = color
	part.Anchored = true
	part.Parent = Workspace
	return part
end

Players.PlayerAdded:Connect(function(player)
	print(player.Name .. " joined the game")
	local origin = Vector3.new(0, 10, 0)
	spawnPart(origin, Color3.fromRGB(255, 100, 100))
end)
`,ts:`import { Workspace, Players } from "@rbxts/services";
import { Part } from "@rbxts/types";

function spawnPart(position: Vector3, color: Color3): Part {
	const part = new Part();
	part.Position = position.add(new Vector3(0, 5, 0));
	part.Size = new Vector3(2, 2, 2);
	part.Color = color;
	part.Anchored = true;
	part.Parent = Workspace;
	return part;
}

Players.PlayerAdded.Connect((player) => {
	print(\`\${player.Name} joined the game\`);
	const origin = new Vector3(0, 10, 0);
	spawnPart(origin, Color3.fromRGB(255, 100, 100));
});
`},{name:"Vector math and CFrame",luau:`local function distance(a: Vector3, b: Vector3): number
	return (a - b).Magnitude
end

local function lookAt(origin: Vector3, target: Vector3): CFrame
	return CFrame.new(origin, target)
end

local a = Vector3.new(0, 0, 0)
local b = Vector3.new(3, 4, 0)
print(distance(a, b))

local camera = lookAt(Vector3.new(10, 5, 10), Vector3.zero)
print(camera.Position)

local spin = CFrame.Angles(0, math.rad(45), 0)
local rotated = spin * Vector3.new(1, 0, 0)
print(rotated)
`,ts:`function distance(a: Vector3, b: Vector3): number {
	return a.sub(b).Magnitude;
}

function lookAt(origin: Vector3, target: Vector3): CFrame {
	return new CFrame(origin, target);
}

const a = new Vector3(0, 0, 0);
const b = new Vector3(3, 4, 0);
print(distance(a, b));

const camera = lookAt(new Vector3(10, 5, 10), Vector3.zero);
print(camera.Position);

const spin = CFrame.Angles(0, math.rad(45), 0);
const rotated = spin.mul(new Vector3(1, 0, 0));
print(rotated);
`},{name:"pcall and multi-return",luau:`local function divide(a: number, b: number): number
	if b == 0 then
		error("division by zero")
	end
	return a / b
end

local ok, result = pcall(divide, 10, 2)
if ok then
	print("result:", result)
else
	warn("failed:", result)
end

local function pair(): (string, number)
	return "answer", 42
end

local label, value = pair()
print(label, value)
`,ts:`function divide(a: number, b: number): number {
	if (b === 0) {
		error("division by zero");
	}
	return a / b;
}

const [ok, result] = pcall(divide, 10, 2);
if (ok) {
	print("result:", result);
} else {
	warn("failed:", result);
}

function pair(): LuaTuple<[string, number]> {
	return $tuple("answer", 42);
}

const [label, value] = pair();
print(label, value);
`},{name:"Houkago Tea Time (K-On!)",luau:`local Workspace = game:GetService("Workspace")

local Member = setmetatable({}, {})
Member.__index = Member

function Member.new(name: string, instrument: string, color: Color3)
	local self = setmetatable({}, Member)
	self.name = name
	self.instrument = instrument
	self.color = color
	return self
end

function Member:introduce()
	return self.name .. " plays the " .. self.instrument
end

local HoukagoTeaTime = {
	Member.new("Yui",    "lead guitar",   Color3.fromRGB(255, 180, 80)),
	Member.new("Mio",    "bass",          Color3.fromRGB(60,  120, 220)),
	Member.new("Ritsu",  "drums",         Color3.fromRGB(255, 220, 100)),
	Member.new("Mugi",   "keyboard",      Color3.fromRGB(255, 220, 200)),
	Member.new("Azusa",  "rhythm guitar", Color3.fromRGB(200, 80,  80)),
}

local function spawnInstrument(member, x: number)
	local part = Instance.new("Part")
	part.Name = member.name .. "_" .. member.instrument
	part.Size = Vector3.new(2, 3, 1)
	part.Position = Vector3.new(x, 5, 0)
	part.Color = member.color
	part.Anchored = true
	part.Parent = Workspace
	return part
end

for i, member in ipairs(HoukagoTeaTime) do
	print(member:introduce())
	spawnInstrument(member, (i - 3) * 4)
end

print("rehearsal time, " .. tostring(#HoukagoTeaTime) .. " members ready for tea")
`,ts:`import { Workspace } from "@rbxts/services";
import { Part } from "@rbxts/types";

class Member {
	constructor(
		public name: string,
		public instrument: string,
		public color: Color3,
	) {}
	introduce(): string {
		return \`\${this.name} plays the \${this.instrument}\`;
	}
}

const HoukagoTeaTime: Array<Member> = [
	new Member("Yui",   "lead guitar",   Color3.fromRGB(255, 180, 80)),
	new Member("Mio",   "bass",          Color3.fromRGB(60,  120, 220)),
	new Member("Ritsu", "drums",         Color3.fromRGB(255, 220, 100)),
	new Member("Mugi",  "keyboard",      Color3.fromRGB(255, 220, 200)),
	new Member("Azusa", "rhythm guitar", Color3.fromRGB(200, 80,  80)),
];

function spawnInstrument(member: Member, x: number): Part {
	const part = new Part();
	part.Name = \`\${member.name}_\${member.instrument}\`;
	part.Size = new Vector3(2, 3, 1);
	part.Position = new Vector3(x, 5, 0);
	part.Color = member.color;
	part.Anchored = true;
	part.Parent = Workspace;
	return part;
}

HoukagoTeaTime.forEach((member, i) => {
	print(member.introduce());
	spawnInstrument(member, (i - 2) * 4);
});

print(\`rehearsal time, \${HoukagoTeaTime.size()} members ready for tea\`);
`},{name:"Iteration patterns",luau:`local fruits = { "apple", "banana", "cherry" }

for i, fruit in ipairs(fruits) do
	print(i, fruit)
end

local prices: { [string]: number } = {
	apple = 1.25,
	banana = 0.50,
	cherry = 3.00,
}

local total = 0
for name, price in pairs(prices) do
	print(name, price)
	total = total + price
end
print("total:", total)

table.insert(fruits, "date")
print("count:", #fruits)
`,ts:`const fruits = ["apple", "banana", "cherry"];

for (let i = 0; i < fruits.length; i++) {
	const fruit = fruits[i];
	print(i + 1, fruit);
}

const prices: Record<string, number> = {
	apple: 1.25,
	banana: 0.5,
	cherry: 3.0,
};

let total = 0;
for (const [name, price] of pairs(prices)) {
	print(name, price);
	total += price;
}
print("total:", total);

table.insert(fruits, "date");
print("count:", fruits.size());
`}],T=k[0].luau,C=k[0].ts;function M(){let e=function(){let[e,r]=(0,n.useState)("light");return(0,n.useEffect)(()=>{let e=document.documentElement,t=()=>{r("dark"===e.getAttribute("data-theme")?"dark":"light")};t();let a=new MutationObserver(t);return a.observe(e,{attributes:!0,attributeFilter:["data-theme"]}),()=>a.disconnect()},[]),e}(),[r,l]=(0,n.useState)(0),[c,u]=(0,n.useState)(T),[m,p]=(0,n.useState)(C),[d,f]=(0,n.useState)("rbxts"),[b,h]=(0,n.useState)("luauToTs"),[g,w]=(0,n.useState)(""),[x,y]=(0,n.useState)([]),[v,M]=(0,n.useState)(!1),[N,V]=(0,n.useState)("idle"),_=(0,n.useRef)(null),L=(0,n.useRef)(null),$=(0,n.useRef)(null);async function R(){if("luauToTs"===b){let e=_.current;if(e){M(!0);try{let r=await e.compile(c,{compatMode:d});w(r.source),y(r.errors??[])}catch(e){y([{message:e.message}]),w("")}finally{M(!1)}}}else{let e=L.current;if(!e||"ready"!==N)return;M(!0),e.postMessage({type:"compile",source:m})}}(0,n.useEffect)(()=>{let e=!1;return(async()=>{try{let r=await Promise.all([t.e("847"),t.e("202")]).then(t.bind(t,2641));e||(_.current=r),e||"luauToTs"!==b||R()}catch(r){e||y([{message:`Failed to load Luau\u{2192}TS compiler: ${r.message}`}])}})(),()=>{e=!0}},[]),(0,n.useEffect)(()=>{if("tsToLuau"!==b)return;if(L.current&&"ready"===N)return void R();if("loading"===N)return;V("loading");let e=!1;return(async()=>{try{let r=new Worker("/rbxts-worker.js");if(r.addEventListener("message",e=>{e.data?.type==="compiled"&&(w(e.data.source),y(e.data.ok?[]:[{message:"roblox-ts compile errors (see output)"}]),M(!1))}),r.addEventListener("error",e=>{y([{message:`Worker error: ${e.message??"unknown"}`}]),V("error"),M(!1)}),L.current=r,await j(r),e)return;V("ready"),R()}catch(r){e||(y([{message:`Failed to spawn TS\u{2192}Luau worker: ${r.message}`}]),V("error"))}})(),()=>{e=!0}},[b]),(0,n.useEffect)(()=>()=>{L.current?.terminate()},[]),(0,n.useEffect)(()=>($.current&&clearTimeout($.current),$.current=setTimeout(()=>{R()},150),()=>{$.current&&clearTimeout($.current)}),[c,m,d,b,N]);let W="dark"===e?s.Zj.dracula:s.Zj.github,G="tsToLuau"===b,F=G?m:c;return(0,a.jsxs)("div",{className:"root_oAx2",children:[(0,a.jsxs)("div",{className:"toolbar_FTq7",children:[(0,a.jsxs)("h1",{className:"title_Nfa7",children:[G?"TypeScript \u2192 Luau":"Luau \u2192 TypeScript"," playground"]}),(0,a.jsxs)("div",{className:"controls_hnU5",children:[(0,a.jsxs)("label",{className:o,children:[(0,a.jsx)("span",{children:"Example:"}),(0,a.jsx)("select",{value:r,onChange:e=>{var r;let t;(t=k[r=Number(e.target.value)])&&(l(r),u(t.luau),p(t.ts))},className:i,children:k.map((e,r)=>(0,a.jsx)("option",{value:r,children:e.name},r))})]}),!G&&(0,a.jsxs)("label",{className:o,children:[(0,a.jsx)("span",{children:"Compat mode:"}),(0,a.jsxs)("select",{value:d,onChange:e=>f(e.target.value),className:i,children:[(0,a.jsx)("option",{value:"native",children:"native (luau2ts/runtime)"}),(0,a.jsx)("option",{value:"rbxts",children:"rbxts (@rbxts/* shim)"})]})]}),(0,a.jsx)("span",{className:"busy_j2FR",children:G&&"loading"===N?"loading roblox-ts + @rbxts/types\u2026":v?"compiling\u2026":""})]})]}),(0,a.jsxs)("div",{className:"panes_olFc",children:[(0,a.jsx)(P,{source:F,label:G?"TypeScript source":"Luau source",lang:G?"tsx":"lua",onChange:G?p:u,prismTheme:W}),(0,a.jsx)("button",{type:"button",onClick:()=>h(e=>"luauToTs"===e?"tsToLuau":"luauToTs"),className:"swap_x44F","aria-label":"Swap direction",title:G?"Switch to Luau \u2192 TypeScript":"Switch to TypeScript \u2192 Luau (loads roblox-ts in a worker)",children:(0,a.jsx)(S,{})}),(0,a.jsx)(A,{output:g,label:G?"Luau output":"TypeScript output",lang:G?"lua":"tsx",errors:x,prismTheme:W})]})]})}function P({source:e,label:r,lang:t,onChange:s,prismTheme:o}){let i=(0,n.useRef)(null),u=(0,n.useRef)(null),m=(0,n.useMemo)(()=>Math.max(1,e.split("\n").length),[e]);return(0,a.jsxs)("div",{className:l,children:[(0,a.jsx)("div",{className:c,children:r}),(0,a.jsxs)("div",{className:"editorWrap_an2x",children:[(0,a.jsx)("div",{className:"editorGutter_NWp0",ref:u,"aria-hidden":!0,children:Array.from({length:m},(e,r)=>(0,a.jsx)("div",{className:"editorGutterLine_Exzz",children:r+1},r))}),(0,a.jsx)("textarea",{ref:i,value:e,onChange:e=>s(e.target.value),onScroll:function(){u.current&&i.current&&(u.current.scrollTop=i.current.scrollTop)},spellCheck:!1,className:"editor_TLlF","aria-label":r})]}),(0,a.jsxs)("span",{style:{display:"none"},children:[t,o.plain?.color??""]})]})}function A({output:e,label:r,lang:t,errors:n,prismTheme:s}){return(0,a.jsxs)("div",{className:l,children:[(0,a.jsx)("div",{className:c,children:r}),(0,a.jsx)(N,{source:e,lang:t,prismTheme:s}),n.length>0&&(0,a.jsx)("div",{className:"errors_GbBP",children:n.map((e,r)=>(0,a.jsxs)("div",{className:"errorRow_vLpB",children:[e.loc?`line ${e.loc.start.line+1}: `:"",e.message]},r))})]})}function S(){return(0,a.jsxs)("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:[(0,a.jsx)("path",{d:"M7 16V4M7 4L3 8M7 4l4 4"}),(0,a.jsx)("path",{d:"M17 8v12M17 20l-4-4M17 20l4-4"})]})}function N({source:e,lang:r,prismTheme:t}){return(0,a.jsx)(s.f4,{code:e,language:r,theme:t,children:({className:e,style:r,tokens:t,getLineProps:n,getTokenProps:s})=>(0,a.jsx)("pre",{className:`${e} output_KJb5`,style:r,children:t.map((e,r)=>(0,a.jsxs)("div",{...n({line:e}),children:[(0,a.jsx)("span",{className:"lineNum_BdmQ",children:r+1}),e.map((e,r)=>(0,a.jsx)("span",{...s({token:e})},r))]},r))})})}},4662(e,r,t){t.r(r),t.d(r,{default:()=>o});var a=t(1325),n=t(4825),s=t(1372);function o(){return(0,a.jsx)(s.A,{title:"Playground",description:"Compile Luau to TypeScript live, with native and roblox-ts compat modes.",children:(0,a.jsx)(n.A,{fallback:(0,a.jsx)("div",{style:{padding:"2rem"},children:"Loading playground\u2026"}),children:()=>{let e=t(6882).default;return(0,a.jsx)(e,{})}})})}}}]);