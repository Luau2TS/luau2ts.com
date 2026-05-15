import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Highlight, themes } from "prism-react-renderer";
import styles from "./Playground.module.css";
import { bootstrapWorkerTypings } from "./_typings";

interface Example {
	name: string;
	luau: string;
	ts: string;
}

const EXAMPLES: ReadonlyArray<Example> = [
	{
		name: "Animal class",
		luau: `local Animal = setmetatable({}, {})
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
`,
		ts: `class Animal {
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
`,
	},
	{
		name: "Services and Instances",
		luau: `local Workspace = game:GetService("Workspace")
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
`,
		ts: `import { Workspace, Players } from "@rbxts/services";
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
`,
	},
	{
		name: "Vector math and CFrame",
		luau: `local function distance(a: Vector3, b: Vector3): number
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
`,
		ts: `function distance(a: Vector3, b: Vector3): number {
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
`,
	},
	{
		name: "pcall and multi-return",
		luau: `local function divide(a: number, b: number): number
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
`,
		ts: `function divide(a: number, b: number): number {
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
`,
	},
	{
		name: "Houkago Tea Time (K-On!)",
		luau: `local Workspace = game:GetService("Workspace")

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
`,
		ts: `import { Workspace } from "@rbxts/services";
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
`,
	},
	{
		name: "Iteration patterns",
		luau: `local fruits = { "apple", "banana", "cherry" }

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
`,
		ts: `const fruits = ["apple", "banana", "cherry"];

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
`,
	},
];

const DEFAULT_LUAU = EXAMPLES[0].luau;
const DEFAULT_TS = EXAMPLES[0].ts;

type CompatMode = "native" | "rbxts";
type Direction = "luauToTs" | "tsToLuau";

interface CompileShape {
	source: string;
	errors: Array<{ message: string; loc?: { start: { line: number; col: number } } }>;
}

interface CompilerModule {
	compile: (source: string, options?: { compatMode?: CompatMode }) => Promise<CompileShape>;
}

export default function Playground(): ReactNode {
	const colorMode = useColorModeFromDom();
	// Two independent buffers so a swap doesn't lose the user's work in
	// either pane. The active direction picks which one is editable / which
	// gets compiled into.
	const [exampleIndex, setExampleIndex] = useState<number>(0);
	const [luauSource, setLuauSource] = useState<string>(DEFAULT_LUAU);
	const [tsSource, setTsSource] = useState<string>(DEFAULT_TS);
	const [mode, setMode] = useState<CompatMode>("rbxts");

	function selectExample(i: number): void {
		const ex = EXAMPLES[i];
		if (!ex) return;
		setExampleIndex(i);
		setLuauSource(ex.luau);
		setTsSource(ex.ts);
	}
	const [direction, setDirection] = useState<Direction>("luauToTs");
	const [output, setOutput] = useState<string>("");
	const [errors, setErrors] = useState<CompileShape["errors"]>([]);
	const [busy, setBusy] = useState<boolean>(false);
	const [workerStatus, setWorkerStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
	const compilerRef = useRef<CompilerModule | null>(null);
	const workerRef = useRef<Worker | null>(null);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// Lazy-load our Luau→TS compiler on first paint.
	useEffect(() => {
		let cancelled = false;
		void (async () => {
			try {
				const mod = (await import("luau2ts")) as unknown as CompilerModule;
				if (!cancelled) compilerRef.current = mod;
				if (!cancelled && direction === "luauToTs") void runCompile();
			} catch (e) {
				if (!cancelled) {
					setErrors([{ message: `Failed to load Luau→TS compiler: ${(e as Error).message}` }]);
				}
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);

	// Lazy-spawn the rbxts worker the first time the user flips. The worker
	// bundle is ~4 MB, so we don't load it unless someone actually needs it.
	// After spawn, fetch @rbxts/types + @rbxts/compiler-types from jsdelivr
	// into the worker's virtual FS so roblox-ts has the typings it expects;
	// the MacroManager fails on any source if Promise / Map / etc. aren't
	// declared.
	useEffect(() => {
		if (direction !== "tsToLuau") return;
		if (workerRef.current && workerStatus === "ready") {
			void runCompile();
			return;
		}
		if (workerStatus === "loading") return;
		setWorkerStatus("loading");
		let cancelled = false;
		void (async () => {
			try {
				const w = new Worker("/rbxts-worker.js");
				w.addEventListener("message", (e: MessageEvent<{ type: string; ok: boolean; source: string }>) => {
					if (e.data?.type === "compiled") {
						setOutput(e.data.source);
						setErrors(e.data.ok ? [] : [{ message: "roblox-ts compile errors (see output)" }]);
						setBusy(false);
					}
				});
				w.addEventListener("error", e => {
					setErrors([{ message: `Worker error: ${e.message ?? "unknown"}` }]);
					setWorkerStatus("error");
					setBusy(false);
				});
				workerRef.current = w;
				await bootstrapWorkerTypings(w);
				if (cancelled) return;
				setWorkerStatus("ready");
				void runCompile();
			} catch (e) {
				if (!cancelled) {
					setErrors([{ message: `Failed to spawn TS→Luau worker: ${(e as Error).message}` }]);
					setWorkerStatus("error");
				}
			}
		})();
		return () => {
			cancelled = true;
			// Keep the worker alive across direction flips so we don't pay the
			// 4 MB load cost twice. Only tear down on unmount.
		};
	}, [direction]);

	useEffect(() => {
		return () => {
			workerRef.current?.terminate();
		};
	}, []);

	// Recompile on source / mode / direction change with a 150ms debounce.
	// Also retriggers when the worker transitions to 'ready' so the first
	// compile after typings finish loading actually fires.
	useEffect(() => {
		if (debounceRef.current) clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => {
			void runCompile();
		}, 150);
		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
		};
	}, [luauSource, tsSource, mode, direction, workerStatus]);

	async function runCompile(): Promise<void> {
		if (direction === "luauToTs") {
			const c = compilerRef.current;
			if (!c) return;
			setBusy(true);
			try {
				const r = await c.compile(luauSource, { compatMode: mode });
				setOutput(r.source);
				setErrors(r.errors ?? []);
			} catch (e) {
				setErrors([{ message: (e as Error).message }]);
				setOutput("");
			} finally {
				setBusy(false);
			}
		} else {
			const w = workerRef.current;
			if (!w || workerStatus !== "ready") return;
			setBusy(true);
			w.postMessage({ type: "compile", source: tsSource });
		}
	}

	const prismTheme = colorMode === "dark" ? themes.dracula : themes.github;
	const flipped = direction === "tsToLuau";
	const sourceValue = flipped ? tsSource : luauSource;
	const setSourceValue = flipped ? setTsSource : setLuauSource;
	const sourceLabel = flipped ? "TypeScript source" : "Luau source";
	const outputLabel = flipped ? "Luau output" : "TypeScript output";
	const sourceLang = flipped ? "typescript" : "lua";
	const outputLang = flipped ? "lua" : "typescript";

	return (
		<div className={styles.root}>
			<div className={styles.toolbar}>
				<h1 className={styles.title}>{flipped ? "TypeScript → Luau" : "Luau → TypeScript"} playground</h1>
				<div className={styles.controls}>
					<label className={styles.modeLabel}>
						<span>Example:</span>
						<select
							value={exampleIndex}
							onChange={e => selectExample(Number(e.target.value))}
							className={styles.select}
						>
							{EXAMPLES.map((ex, i) => (
								<option key={i} value={i}>
									{ex.name}
								</option>
							))}
						</select>
					</label>
					{!flipped && (
						<label className={styles.modeLabel}>
							<span>Compat mode:</span>
							<select
								value={mode}
								onChange={e => setMode(e.target.value as CompatMode)}
								className={styles.select}
							>
								<option value="native">native (luau2ts/runtime)</option>
								<option value="rbxts">rbxts (@rbxts/* shim)</option>
							</select>
						</label>
					)}
					<span className={styles.busy}>
						{flipped && workerStatus === "loading"
							? "loading roblox-ts + @rbxts/types…"
							: busy
								? "compiling…"
								: ""}
					</span>
				</div>
			</div>

			<div className={styles.panes}>
				{/* Source pane is always on the left, output pane always on the
            right. Flipping the direction swaps which one is editable and
            which language each one carries (not their physical position). */}
				<SourcePane
					source={sourceValue}
					label={sourceLabel}
					lang={sourceLang}
					onChange={setSourceValue}
					prismTheme={prismTheme}
				/>

				<button
					type="button"
					onClick={e => {
						// Blur the button immediately so the next Space keypress
						// in the editor doesn't re-activate it (default <button>
						// behavior: Space when focused fires onClick again).
						e.currentTarget.blur();
						setDirection(d => (d === "luauToTs" ? "tsToLuau" : "luauToTs"));
					}}
					className={styles.swap}
					aria-label="Swap direction"
					title={
						flipped
							? "Switch to Luau → TypeScript"
							: "Switch to TypeScript → Luau (loads roblox-ts in a worker)"
					}
				>
					<SwapIcon />
				</button>

				<OutputPane
					output={output}
					label={outputLabel}
					lang={outputLang}
					errors={errors}
					prismTheme={prismTheme}
				/>
			</div>
		</div>
	);
}

function SourcePane({
	source,
	label,
	lang,
	onChange,
	prismTheme,
}: {
	source: string;
	label: string;
	lang: string;
	onChange: (v: string) => void;
	prismTheme: import("prism-react-renderer").PrismTheme;
}): ReactNode {
	// Editor strategy: a transparent <textarea> overlays a syntax-
	// highlighted <pre> rendered with prism-react-renderer. The textarea
	// owns the keyboard / caret / selection; the <pre> only paints the
	// colors. Both have identical font metrics + padding + tab-size so
	// glyphs line up to the pixel. Scroll is synced both vertically (for
	// the line-number gutter) and horizontally (so long lines stay
	// aligned in both layers).
	const taRef = useRef<HTMLTextAreaElement | null>(null);
	const overlayRef = useRef<HTMLPreElement | null>(null);
	const gutterRef = useRef<HTMLDivElement | null>(null);
	const lineCount = useMemo(() => Math.max(1, source.split("\n").length), [source]);

	function syncScroll(): void {
		const ta = taRef.current;
		if (!ta) return;
		if (gutterRef.current) gutterRef.current.scrollTop = ta.scrollTop;
		if (overlayRef.current) {
			overlayRef.current.scrollTop = ta.scrollTop;
			overlayRef.current.scrollLeft = ta.scrollLeft;
		}
	}

	// Tab handling: insert a literal tab character at the cursor (or
	// indent each line of a multi-line selection). Shift+Tab outdents
	// the start of each selected line. Browser default Tab moves focus,
	// which is wrong in a code editor.
	function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>): void {
		if (e.key !== "Tab") return;
		e.preventDefault();
		const ta = e.currentTarget;
		const start = ta.selectionStart;
		const end = ta.selectionEnd;
		const before = source.slice(0, start);
		const inside = source.slice(start, end);
		const after = source.slice(end);

		if (start === end) {
			// No selection: insert a single tab and advance the cursor.
			const next = before + "\t" + after;
			onChange(next);
			requestAnimationFrame(() => {
				ta.selectionStart = ta.selectionEnd = start + 1;
			});
			return;
		}

		// Selection spans one or more lines. Operate on whole lines so
		// re-indenting feels predictable.
		const lineStart = before.lastIndexOf("\n") + 1;
		const head = source.slice(0, lineStart);
		const block = source.slice(lineStart, end);
		const lines = block.split("\n");

		let newBlock: string;
		let delta: number;
		if (e.shiftKey) {
			// Outdent: strip a leading tab or up to 4 leading spaces.
			let removed = 0;
			newBlock = lines
				.map(line => {
					if (line.startsWith("\t")) {
						removed += 1;
						return line.slice(1);
					}
					const sp = line.match(/^ {1,4}/);
					if (sp) {
						removed += sp[0].length;
						return line.slice(sp[0].length);
					}
					return line;
				})
				.join("\n");
			delta = -removed;
		} else {
			// Indent: prepend a tab to each line.
			newBlock = lines.map(line => "\t" + line).join("\n");
			delta = lines.length;
		}

		const next = head + newBlock + after;
		onChange(next);
		requestAnimationFrame(() => {
			// Keep the same logical selection over the re-indented block.
			ta.selectionStart = Math.max(lineStart, start + (e.shiftKey ? Math.min(0, delta) : 1));
			ta.selectionEnd = end + delta;
			void inside;
		});
	}

	return (
		<div className={styles.pane}>
			<div className={styles.paneHeader}>{label}</div>
			<div className={styles.editorWrap}>
				<div className={styles.editorGutter} ref={gutterRef} aria-hidden>
					{Array.from({ length: lineCount }, (_, i) => (
						<div key={i} className={styles.editorGutterLine}>
							{i + 1}
						</div>
					))}
				</div>
				<div className={styles.editorStack}>
					<Highlight code={source} language={lang} theme={prismTheme}>
						{({ className, style, tokens, getLineProps, getTokenProps }) => (
							<pre
								ref={overlayRef}
								className={`${className} ${styles.editorOverlay}`}
								style={style}
								aria-hidden
							>
								{tokens.map((line, i) => (
									<span key={i} {...getLineProps({ line })}>
										{line.map((token, j) => (
											<span key={j} {...getTokenProps({ token })} />
										))}
										{i < tokens.length - 1 && "\n"}
									</span>
								))}
							</pre>
						)}
					</Highlight>
					<textarea
						ref={taRef}
						value={source}
						onChange={e => onChange(e.target.value)}
						onKeyDown={handleKeyDown}
						onScroll={syncScroll}
						spellCheck={false}
						className={styles.editor}
						aria-label={label}
					/>
				</div>
			</div>
		</div>
	);
}

function OutputPane({
	output,
	label,
	lang,
	errors,
	prismTheme,
}: {
	output: string;
	label: string;
	lang: string;
	errors: CompileShape["errors"];
	prismTheme: import("prism-react-renderer").PrismTheme;
}): ReactNode {
	return (
		<div className={styles.pane}>
			<div className={styles.paneHeader}>{label}</div>
			<Output source={output} lang={lang} prismTheme={prismTheme} />
			{errors.length > 0 && (
				<div className={styles.errors}>
					{errors.map((e, i) => (
						<div key={i} className={styles.errorRow}>
							{e.loc ? `line ${e.loc.start.line + 1}: ` : ""}
							{e.message}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

function useColorModeFromDom(): "light" | "dark" {
	const [mode, setMode] = useState<"light" | "dark">("light");
	useEffect(() => {
		const html = document.documentElement;
		const read = (): void => {
			setMode(html.getAttribute("data-theme") === "dark" ? "dark" : "light");
		};
		read();
		const obs = new MutationObserver(read);
		obs.observe(html, { attributes: true, attributeFilter: ["data-theme"] });
		return () => obs.disconnect();
	}, []);
	return mode;
}

function SwapIcon(): ReactNode {
	return (
		<svg
			width="22"
			height="22"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
		>
			<path d="M7 16V4M7 4L3 8M7 4l4 4" />
			<path d="M17 8v12M17 20l-4-4M17 20l4-4" />
		</svg>
	);
}

function Output({
	source,
	lang,
	prismTheme,
}: {
	source: string;
	lang: string;
	prismTheme: import("prism-react-renderer").PrismTheme;
}): ReactNode {
	// Show the compiler's `// Compiled by …` header verbatim. Earlier we
	// stripped it for compactness, but it's a useful tell for which compiler
	// produced the output (ours vs. roblox-ts) and for what version.
	return (
		<Highlight code={source} language={lang} theme={prismTheme}>
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<pre className={`${className} ${styles.output}`} style={style}>
					{tokens.map((line, i) => (
						<div key={i} {...getLineProps({ line })}>
							<span className={styles.lineNum}>{i + 1}</span>
							{line.map((token, key) => (
								<span key={key} {...getTokenProps({ token })} />
							))}
						</div>
					))}
				</pre>
			)}
		</Highlight>
	);
}
