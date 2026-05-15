"use strict";(self.webpackChunkluau2ts_com=self.webpackChunkluau2ts_com||[]).push([["164"],{4825(e,t,a){a.d(t,{A:()=>n});var l=a(1325);a(489);var r=a(1626);function n({children:e,fallback:t}){return(0,r.A)()?(0,l.jsx)(l.Fragment,{children:e?.()}):t??null}},7953(e,t,a){a.r(t),a.d(t,{default:()=>o});var l=a(1325),r=a(489),n=a(383);let s="pane_ZPzd",i="paneHeader_vQW2",c=`local Workspace = game:GetService("Workspace")
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
`;function o(){let e=function(){let[e,t]=(0,r.useState)(()=>"u"<typeof document?"light":"dark"===document.documentElement.getAttribute("data-theme")?"dark":"light");return(0,r.useEffect)(()=>{if("u"<typeof document)return;let e=new MutationObserver(()=>{t("dark"===document.documentElement.getAttribute("data-theme")?"dark":"light")});return e.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),()=>e.disconnect()},[]),e}(),[t,a]=(0,r.useState)(c),[o,u]=(0,r.useState)("rbxts"),[d,m]=(0,r.useState)(""),[p,h]=(0,r.useState)([]),[f,v]=(0,r.useState)(!1),x=(0,r.useRef)(null),g=(0,r.useRef)(null);async function j(e,t){let a=x.current;if(a){v(!0);try{let l=await a.compile(e,{compatMode:t});m(l.source),h(l.errors??[])}catch(e){h([{message:e.message}])}finally{v(!1)}}}(0,r.useEffect)(()=>{let e=!1;return(async()=>{try{let a=await Promise.resolve().then(function(){var e=Error("Cannot find module 'luau2ts'");throw e.code="MODULE_NOT_FOUND",e});e||(x.current=a,j(t,o))}catch(t){e||h([{message:`Failed to load compiler: ${t.message}`}])}})(),()=>{e=!0}},[]),(0,r.useEffect)(()=>(g.current&&clearTimeout(g.current),g.current=setTimeout(()=>void j(t,o),200),()=>{g.current&&clearTimeout(g.current)}),[t,o]);let b="dark"===e?n.Zj.dracula:n.Zj.github;return(0,l.jsxs)("div",{className:"root_oAx2",children:[(0,l.jsxs)("div",{className:"toolbar_FTq7",children:[(0,l.jsx)("span",{className:"title_Nfa7",children:"Luau \u2192 TypeScript"}),(0,l.jsxs)("label",{className:"modeLabel_Li0e",children:["Mode:",(0,l.jsxs)("select",{value:o,onChange:e=>u(e.target.value),className:"select_MIap",children:[(0,l.jsx)("option",{value:"rbxts",children:"rbxts (roblox-ts compatible)"}),(0,l.jsx)("option",{value:"native",children:"native (luau2ts/runtime)"})]})]}),(0,l.jsx)("span",{className:"busy_j2FR",children:f?"compiling\u2026":" "})]}),(0,l.jsxs)("div",{className:"panes_olFc",children:[(0,l.jsxs)("div",{className:s,children:[(0,l.jsx)("div",{className:i,children:"Luau"}),(0,l.jsx)("textarea",{value:t,onChange:e=>a(e.target.value),className:"editor_TLlF",spellCheck:!1})]}),(0,l.jsxs)("div",{className:s,children:[(0,l.jsx)("div",{className:i,children:"TypeScript"}),(0,l.jsx)("div",{className:"output_KJb5",children:(0,l.jsx)(n.f4,{code:d,language:"typescript",theme:b,children:({className:e,style:t,tokens:a,getLineProps:r,getTokenProps:n})=>(0,l.jsx)("pre",{className:e,style:t,children:a.map((e,t)=>(0,l.jsx)("div",{...r({line:e}),children:e.map((e,t)=>(0,l.jsx)("span",{...n({token:e})},t))},t))})})})]})]}),p.length>0&&(0,l.jsx)("div",{className:"errors_GbBP",children:p.map((e,t)=>(0,l.jsxs)("div",{className:"errorRow_vLpB",children:[e.loc&&`line ${e.loc.start.line}:${e.loc.start.col}: `,e.message]},t))})]})}},4662(e,t,a){a.r(t),a.d(t,{default:()=>s});var l=a(1325),r=a(4825),n=a(1372);function s(){return(0,l.jsx)(n.A,{title:"Playground",description:"Compile Luau to TypeScript live, with native and roblox-ts compat modes.",children:(0,l.jsx)(r.A,{fallback:(0,l.jsx)("div",{style:{padding:"2rem"},children:"Loading playground\u2026"}),children:()=>{let e=a(7953).default;return(0,l.jsx)(e,{})}})})}}}]);