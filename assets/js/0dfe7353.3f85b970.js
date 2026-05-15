"use strict";(self.webpackChunkluau2ts_com=self.webpackChunkluau2ts_com||[]).push([["371"],{7953(e,t,a){a.r(t),a.d(t,{default:()=>o});var s=a(1325),l=a(489),r=a(383);let n="pane_ZPzd",c="paneHeader_vQW2",i=`local Workspace = game:GetService("Workspace")
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
`;function o(){let e=function(){let[e,t]=(0,l.useState)(()=>"u"<typeof document?"light":"dark"===document.documentElement.getAttribute("data-theme")?"dark":"light");return(0,l.useEffect)(()=>{if("u"<typeof document)return;let e=new MutationObserver(()=>{t("dark"===document.documentElement.getAttribute("data-theme")?"dark":"light")});return e.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),()=>e.disconnect()},[]),e}(),[t,a]=(0,l.useState)(i),[o,u]=(0,l.useState)("rbxts"),[m,d]=(0,l.useState)(""),[p,h]=(0,l.useState)([]),[f,v]=(0,l.useState)(!1),x=(0,l.useRef)(null),g=(0,l.useRef)(null);async function j(e,t){let a=x.current;if(a){v(!0);try{let s=await a.compile(e,{compatMode:t});d(s.source),h(s.errors??[])}catch(e){h([{message:e.message}])}finally{v(!1)}}}(0,l.useEffect)(()=>{let e=!1;return(async()=>{try{let a=await Promise.resolve().then(function(){var e=Error("Cannot find module 'luau2ts'");throw e.code="MODULE_NOT_FOUND",e});e||(x.current=a,j(t,o))}catch(t){e||h([{message:`Failed to load compiler: ${t.message}`}])}})(),()=>{e=!0}},[]),(0,l.useEffect)(()=>(g.current&&clearTimeout(g.current),g.current=setTimeout(()=>void j(t,o),200),()=>{g.current&&clearTimeout(g.current)}),[t,o]);let b="dark"===e?r.Zj.dracula:r.Zj.github;return(0,s.jsxs)("div",{className:"root_oAx2",children:[(0,s.jsxs)("div",{className:"toolbar_FTq7",children:[(0,s.jsx)("span",{className:"title_Nfa7",children:"Luau \u2192 TypeScript"}),(0,s.jsxs)("label",{className:"modeLabel_Li0e",children:["Mode:",(0,s.jsxs)("select",{value:o,onChange:e=>u(e.target.value),className:"select_MIap",children:[(0,s.jsx)("option",{value:"rbxts",children:"rbxts (roblox-ts compatible)"}),(0,s.jsx)("option",{value:"native",children:"native (luau2ts/runtime)"})]})]}),(0,s.jsx)("span",{className:"busy_j2FR",children:f?"compiling\u2026":" "})]}),(0,s.jsxs)("div",{className:"panes_olFc",children:[(0,s.jsxs)("div",{className:n,children:[(0,s.jsx)("div",{className:c,children:"Luau"}),(0,s.jsx)("textarea",{value:t,onChange:e=>a(e.target.value),className:"editor_TLlF",spellCheck:!1})]}),(0,s.jsxs)("div",{className:n,children:[(0,s.jsx)("div",{className:c,children:"TypeScript"}),(0,s.jsx)("div",{className:"output_KJb5",children:(0,s.jsx)(r.f4,{code:m,language:"typescript",theme:b,children:({className:e,style:t,tokens:a,getLineProps:l,getTokenProps:r})=>(0,s.jsx)("pre",{className:e,style:t,children:a.map((e,t)=>(0,s.jsx)("div",{...l({line:e}),children:e.map((e,t)=>(0,s.jsx)("span",{...r({token:e})},t))},t))})})})]})]}),p.length>0&&(0,s.jsx)("div",{className:"errors_GbBP",children:p.map((e,t)=>(0,s.jsxs)("div",{className:"errorRow_vLpB",children:[e.loc&&`line ${e.loc.start.line}:${e.loc.start.col}: `,e.message]},t))})]})}}}]);