class Graph {
	constructor(V) {
		this.V = V; // 顶点数
		this.E = 0; // 边
		this.adj = []; // 邻接表
	}
}

const fs = require('fs');
const readline = require('readline');

const r1 = readline.createInterface({
  input: fs.createReadStream("./tinyG.txt")
});
let i = 0; //txt中的行数
let V = 0;
let E = 0;
const res = []
r1.on('line', function(line){ //事件监听
	i++;
	if(i === 1) {
		V = line;
	}else if(i === 2) {
		E = line;
	}else {
		res.push({
			v: line.split(' ')[0],
			w: line.split(' ')[1]
		})
	}
});

r1.on('close', () => {
	console.log(V, E, res);
})
