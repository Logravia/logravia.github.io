/* DISPLAY */

const canvas = document.querySelector('.canvas');
const buttons = document.querySelectorAll('.theme-btn');

const canvasSize = {'rows': 20, 'columns': 20};
let game_loop = undefined

const generateDisplayCanvas = (rows, columns) => {
  // make rows for pixels to be in
  for (let i = 0; i < rows; i++) {
    let row = document.createElement('div');
    row.setAttribute("class", "row");

    //make pixels in each row
    for (let j = 0; j < columns; j++) {
      let pixel = document.createElement('div');
      pixel.setAttribute("class", "pixel");
      pixel.dataset.x = j
      pixel.dataset.y = i
      pixel.dataset.on = false
        // color pixel when mouse enters it with the defined theme
      pixel.addEventListener("click",flipCell);
      row.appendChild(pixel);
    }
    canvas.appendChild(row);
  }
}

const switchBlackWhite = pixel => {
  color_to_set = pixel.dataset.on == "false" ? "black" : " "
  pixel.setAttribute("style", `background-color: ${color_to_set}`);
}

const flipCell = (e) => {
  let pixel = e.target
  switchBlackWhite(pixel)
  pixel.dataset.on = pixel.dataset.on == "true" ? false : true
  dataCanvas[pixel.dataset.y][pixel.dataset.x] = !dataCanvas[pixel.dataset.y][pixel.dataset.x]
}

const clearCanvas = () => {
  pixels.forEach(pixel => pixel.setAttribute('style', 'background-color: '))
  dataCanvas = genDataCanvas(canvasSize.rows, canvasSize.columns)
  pixels.forEach(pixel=>{pixel.dataset.on=false})
  pause()
}

/* GAME  */

const coord_changes = [[0,1],[0,-1],[1,0],[-1,0],[1,1],[-1,-1],[-1,1],[1,-1]]

const sum_arrs = (arr1, arr2) => {
  return arr1.map(function (num, idx) {
    return num + arr2[idx]
  })
}

const genDataCanvas = (width, height) => {
  data = Array.from(Array(width), () => new Array(height))

  for (row_num in data) {
    data[row_num].fill(false)
  }

  return data
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
  return (coord[0] > -1 && coord[1] > -1) && (coord[0] < canvasSize.rows && coord[1] < canvasSize.columns);
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


const step = ()=> {
  flip_cells(dataCanvas, cells_to_flip(dataCanvas))
  updateDisplay(dataCanvas)
}

const play = () => {
  clearInterval(game_loop);
  game_loop = setInterval(step, 300)
}

const pause = () => {
  clearInterval(game_loop);
}

const updateDisplay = (data) => {
  pixels.forEach((pixel) => {
    if (dataCanvas[pixel.dataset.y][pixel.dataset.x]) {
      pixel.setAttribute('style', 'background-color: black')
      pixel.dataset.on = true;
    } else {
      pixel.setAttribute('style', 'background-color: ')
      pixel.dataset.on = false;
    }
  })
}

/*DRIVER*/

document.querySelector('#clear').addEventListener('click', clearCanvas);
document.querySelector('#play').addEventListener('click', play);
document.querySelector('#step').addEventListener('click', step);
document.querySelector('#pause').addEventListener('click', pause);

generateDisplayCanvas(canvasSize.rows, canvasSize.columns);
const pixels = document.querySelectorAll('.pixel');
let dataCanvas = genDataCanvas(canvasSize.rows, canvasSize.columns)

dataCanvas = [
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ],
  [
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false
  ],
  [
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    false
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ],
  [
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ],
  [
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ],
  [
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true
  ],
  [
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    true
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true
  ],
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]
]

updateDisplay(dataCanvas);
