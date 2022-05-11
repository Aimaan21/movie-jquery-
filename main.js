const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
		'X-RapidAPI-Key': '3bafa262dbmshe540562a4f75756p13d64ajsn3e008fdd703c'
	}
};

  var url = new URL('https://online-movie-database.p.rapidapi.com/auto-complete?q=game%20of%20thr');
  var search_params = url.searchParams;
 
  var mName;
  var mId;
  var mPoster;
  var mTable;
  var list;
  var listTwo=[];
 

  function showDetails(name,poster)
  {
    ////Show movie details after click that movie
    reset();
    $('#movieName').html(name);
    $('#moviePoster').attr('src',poster);
    $("#moviePoster").attr("hidden",false);

  }

  function reset()
  {
    ///reset the value of movie 'showDetails'
    $('#movieName').html("")
  }

  function transfer(index)
  {
     ///this will transfer one movie from left to right table  
     
     listTwo.unshift(list.splice(index,1));
      
      ///showing left-side table
        $('#tdata-one').empty();  
        movieList(list);
      
      ///showing right-sided table
      $('#tdata-two').empty();  
      $.each(listTwo, function( index, value ) {
        
        mId=value[0].id;
        mName=value[0].l;
        mPoster= value[0].i.imageUrl;
        mTable=
        `<tr onclick="showDetails('${mName}','${mPoster}')"> 
        <td><img src="${mPoster}" alt="" height=100 width=100></td>     
        <td>${mName}</td>
        </tr>`
        document.querySelector('#tdata-two').innerHTML += mTable;
      });
  }

    
  function movieList(list)
  {
    ///this will show the left-sided table
    $.each(list, function( index, value ) {
          
      mId=value.id;
      mName=value.l;
      mPoster= value.i.imageUrl;
      mTable=
      `<tr onclick="showDetails('${mName}','${mPoster}')"> 
      <td><img src="${mPoster}" alt="" height=100 width=100></td>     
      <td>${mName}</td>
      <td><input type="submit" class="button btn btn-primary" value="Transfer" onclick="transfer('${index}');" /></td>
      </tr>`
      document.querySelector('#tdata-one').innerHTML += mTable;
    });
  }


   $(document).ready(function(){

    $("#btn-search").click(function(){
      
        m= $("#search").val();
        search_params.set('q',m);

        // change the search property of the main url
        url.search = search_params.toString();

        // the new url string
        var new_url = url.toString();

        // output : http://demourl.com/path?id=101&topic=main
        console.log(new_url);
        const params = new URLSearchParams(window.location.search)
 
        $('#tdata-one').html("");
        $('#tdata-two').html("");

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                list= data.d;

                movieList(list);         
                
            })
            .catch(err => console.error(err)); 
        //listTwo.empty();    
    });
  });

 