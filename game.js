const coord_changes = [[0,1],[0,-1],[1,0],[-1,0],[1,1],[-1,-1],[-1,1],[1,-1]]
const canv_size = {"x": 20, "y": 20}

const sum_arrs = (arr1, arr2) => {
  return arr1.map(function (num, idx) {
    return num + arr2[idx]
  })
}

const genDataCanvas = (width, height) => {
  canvas = Array.from(Array(width), () => new Array(height))

  for (row_num in canvas) {
    canvas[row_num].fill(false)
  }

  return canvas
}

const cells_to_flip = canvas => {
  list_of_flips = []

  canvas.forEach((row, y)=>{
    row.forEach((cell, x)=>{
      if (must_flip_cell(canvas, x,y)) {
        list_of_flips.push([x,y]);
      }
    })
  })
  return list_of_flips
}

const within_canvas = (coord) => {
  return (coord[0] > -1 && coord[1] > -1) && (coord[0] < canv_size.y && coord[1] < canv_size.x);
}

const count_neighors = (canvas, x, y)=> {
  neighbors = 0

  coord_changes.forEach( change =>{
    neighbor_cell = sum_arrs([x,y], change)
    if (within_canvas(neighbor_cell) && is_alive(canvas, neighbor_cell)) {
      neighbors += 1;
    }
  })
  return neighbors;
}

const must_flip_cell = (canvas, x, y) => {
  neighbors = count_neighors(canvas, x, y)
  alive = canvas[y][x]


  if (alive && (neighbors == 2 || neighbors == 3)) {
    return false
  }

  if (!alive && neighbors == 3) {
    return true
  }

  if (alive) {
    return true
  }

  return false
}

const is_alive = (canvas, cell_coord) => {
  return canvas[cell_coord[1]][cell_coord[0]]
}

const flip_cells = (canvas, to_flip) => {
  to_flip.forEach(coord=>{
    canvas[coord[1]][coord[0]]  = !canvas[coord[1]][coord[0]]
  })
}
