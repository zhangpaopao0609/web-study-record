class BreadthFirstPaths {
	constructor() {
		this.marked = [];
		this.edgeTo = [];
		this.G = G;
		this.s = s;
	}

	breadthFirstPaths() {
		this.bfs(this.G, this.s);
	}

	bfs(G, v) {
		const q = [];
		this.marked[v] = true;
		this.edgeTo[v] = v;
		q.push(v);

		while(q.length) {
			const next = q.shift();
			for (const w of G.adj[next]) {
				if(!this.marked[w]) {
					this.marked[w] = true;
					this.edgeTo[w] = next;
					q.push(w);
				}
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