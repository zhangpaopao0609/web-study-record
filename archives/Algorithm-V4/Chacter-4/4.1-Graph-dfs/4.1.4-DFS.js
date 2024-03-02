class DepthFirstPaths {
	constructor() {
		this.marked = [];
		this.edgeTo = [];
		this.G = G;
		this.s = s;
	}

	depthFirstPaths() {
		this.dfs(this.G, this.s);
	}

	dfs(G, v) {
		this.marked[v] = true;
		for (const w of G.adj[v]) {
			if(!this.marked[w]) {
				this.edgeTo[w] = v;
				dfs(G, w);
			}
		}
	}

	hasPathTo(v) {
		return this.marked[v];
	}

	pathTo(v) {
		const path = [];
		for (let x = v; x != s; x = this.edgeTo[x]) {
			path.push(x);
		}
		return path;
	}
}