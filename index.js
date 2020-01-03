const matrix1 = {
    col:[],
    row:[],
}
function matrix (row,col){
for (let i = 0; i <= 10; i++) {
    const row = document.createElement('div');
    matrix1.row.append(row);

    for (let j = 0; j <= 10; j++) {
        const col = document.createElement('div')
        matrix1.col.append(col)
        col.className.add(`${i}-${j}`) 
    }
    
}

}
matrix()

