jQuery(document).ready(function($)
{
    function AddTable(tableBody)
    {
        var $table = $("<table>")
            .addClass("table table-hover");
        var $thead = $("<thead>");
        var $tr = $("<tr>")
            .append('<th scope="col">Title</th>')
            .append('<th scope="col">Author</th>');
        
        $thead.html($tr);
        $table.append($thead)
            .append(tableBody);
        return $table;
    }

    function AddBookItem(book)
    {
        var $tr = $('<tr>');
        var $th = $("<th>")
            .attr("scope","row")
            .html(book.title);

        var $td1 = $("<td>")
            .html(book.author)

        $tr.append($th)
            .append($td1)
            .data("bookid", book.id);

        return $tr;
    }

    function GetBookData(book)
    {
        var $div1 = $('<div>')
            .addClass("card mb-3 w-50");
        var $div2 = $("<div>")
            .addClass("card-body");
        var $div3 = $('<div>')
            .addClass("row");
        var $div4 = $("<div>")
            .addClass("col");
        var $div5 = $("<div>")
            .addClass("col");
        var $div6 = $("<div>")
            .addClass("row");
        var $img = $("<img>")
            .attr("width", "240")
            .attr("src", book.cover)
            .attr("alt", "book image");

        var $a1 = $("<a>")
        var $a2 = $("<a>")
        

        $div4.append('<h5 class="card-title">' + book.title + '</h5>')
            .append('<p class="card-text"><b>Author:</b> ' + book.author + '</p>')
            .append('<p class="card-text"><b>Country:</b> ' + book.country + '</p>')
            .append('<p class="card-text"><b>Language:</b> ' + book.language + '</p>')
            .append('<p class="card-text"><b>Published Date:</b> ' + book.year + '</p>')
            .append('<p class="card-text"><b>Pages:</b> ' + book.pages + '</p>');

        $div3.append($div4);

        $a1.addClass("btn btn-secondary text-light mr-3")
            .html("Back to books")
            .on("click", function($)
            {
                LoadBookList();
            }
        );

        $a2.addClass("btn btn-primary")
            .html("View Wiki Page")
            .attr("href", book.link)
            .attr("target","_blank")
            .attr("rel","noopener noreferrer");

        $div6.append($a1)
            .append($a2);

        $div5.append($img);
        $div3.append($div5);
        $div2.append($div3)
            .append($div6);

        $div1.append($div2);

        return $div1;
    }

    function LoadBookInfo(bookid)
    {
        $('#loadingModal').modal('show');
        $("#books").empty();
        $("#books").addClass("d-flex align-item-center justify-content-center");
        $.get("http://csc225.mockable.io/books/"+bookid)
            .done(function(data, status)
            {
                if(status == "success")
                {
                    $("#books").append(GetBookData(data));
                    $('#loadingModal').modal('hide');
                    setTimeout(() => { $('#loadingModal').modal('hide'); }, 1000);
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown)
            {
                LoadBookList();
            }
        );
    }

    function LoadBookList()
    {
        $('#loadingModal').modal('show');
        $("#books").empty();
        $("#books").removeClass("d-flex align-item-center justify-content-center");

        $.get("http://csc225.mockable.io/books")
            .done(function(data, status)
            {
                if(status == "success")
                {
                    $("#books").append("<h1>Our Book Collection</h1>");

                    $body = $("<tbody>");
                    $body.attr("style", "cursor: pointer;");
                    data.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
                    data.forEach(function(item){
                        $body.append(AddBookItem(item)
                            .on("click", function(clickedItem)
                            {
                                LoadBookInfo($(this).data("bookid"));
                            })
                        );
                    });
                    $("#books").append(AddTable($body));
                }
                setTimeout(() => { $('#loadingModal').modal('hide'); }, 1000);
            })
            .fail(function(jqXHR, textStatus, errorThrown)
            {
                alert("Error loading page: "+errorThrown);
            }
        );
    }

    LoadBookList();

});