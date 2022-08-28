fetch('https://www.abibliadigital.com.br/api/books', {
    headers: new Headers({
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlNhdCBBdWcgMjcgMjAyMiAyMjo1MzoyMiBHTVQrMDAwMC5wcm90b2NvbG9laWdodEBnbWFpbC5jb20iLCJpYXQiOjE2NjE2NDA4MDJ9.S6wTAp5g5sgRDsaeQijFWx4AMAjqMMxwTrdHiiMktzM'
      })
})
.then(resposta => resposta.json())
.then (data =>{
    
    for (i = 0; i < data.length; i++) {
        $("#escolha-livro").append(`<option value="${i}">${data[i].name}</option>`);
    }
    $('.selectpicker').selectpicker('refresh');

    $("#escolha-livro").change(function() {
        var $cap = $("#escolha-capitulo");
        $cap.empty();
        $('.selectpicker').selectpicker('refresh');
        
        var valor = document.getElementById("escolha-livro").value;

        abreviacao = data[valor].abbrev['pt']

        
        quantidade = data[valor].chapters

        for (i = 1; i < quantidade+1; i++) {
            $cap.append(`<option value="${i}">${i}</option>`);
            
        }
        
        $('.selectpicker').selectpicker('refresh');

        $("#escolha-capitulo").change(function() {
            quantidade = data[valor].chapters
            capitulo = document.getElementById("escolha-capitulo").value;
        })
    })
})

function pesquisar(){
    
    fetch(`https://www.abibliadigital.com.br/api/verses/nvi/${abreviacao}/${capitulo}`, {
        headers: new Headers({
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlNhdCBBdWcgMjcgMjAyMiAyMjo1MzoyMiBHTVQrMDAwMC5wcm90b2NvbG9laWdodEBnbWFpbC5jb20iLCJpYXQiOjE2NjE2NDA4MDJ9.S6wTAp5g5sgRDsaeQijFWx4AMAjqMMxwTrdHiiMktzM'
          })
    })
    .then(resposta => resposta.json())
    .then (data =>{
        
        var $vers = $("#tituloPrincipal");
        $vers.empty();

        var $aut = $("#autor");
        $aut.empty();

        var $vers = $("#versiculos");
        $vers.empty();

      $("#autor").append(`Autor: ${data["book"]["author"]}`)

        $("#tituloPrincipal").append(`${data["book"]["name"]} - Capítulo: ${data["chapter"]["number"]}`)

              

        versiculos = data["verses"]
        for (i = 0; i < versiculos.length; i++) {
        $("#versiculos").append(`
        <p id="numeroVersiculo">Versículo: ${versiculos[i]["number"]}</p>
        <p id="textoVersiculo">${versiculos[i]["text"]}</p>`)
        }
    })
}






document.querySelector('#darkmode').addEventListener('change', function(event){
  document.querySelector('body').classList.toggle('dark');
  document.querySelector("#botao").classList.toggle('dark');
});

console.log('Deus te abençõe!')