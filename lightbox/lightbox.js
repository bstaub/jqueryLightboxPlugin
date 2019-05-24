
jQuery.fn.lightbox = function(){


  $(this).click(function () {

    var that = this;

    var overlay = $.parseHTML('<div class="overlay"></div>');
    $('body').append(overlay);

    var imageskeleton = '<img class="image-container__image">';
    var image = $.parseHTML(imageskeleton);
    var image_prev = $.parseHTML(imageskeleton);
    var image_next = $.parseHTML(imageskeleton);



    imageBuilder(this);

    function imageBuilder(that) {
      var src_prev = $(that).prev().attr('src');
      var src_next = $(that).next().attr('src');
      $(image_prev).attr('src', src_prev);
      $(image_next).attr('src', src_next);

      var src = $(that).attr('src');  //bezieht sich auf aktuelles element
      $(image).attr('src', src);
      $(image).attr('data-prev', src_prev);
      $(image).attr('data-next', src_next);
      addImageToContainer(image);
    }





    function addImageToContainer(image) {
      //$('body').append(overlay);
      $(".container-overlay").remove();
      var container = $.parseHTML('<div class="container-overlay"></div>');
      var navcontainer = $.parseHTML('<div class="image-container__nav"></div>');
      var prevnav = $.parseHTML('<div class="image-container__nav__prev"><span class="icon">&lt;</span></div>');
      var nextnav = $.parseHTML('<div class="image-container__nav__next"><span class="icon">&gt;</span></div>');
      var imagecontainer = $.parseHTML(`
                <div class="image-container">
                  <!-- here comes the image prepend  -->
                  <!-- navcontainer goes here  -->
                </div>
          `);
      $(imagecontainer).prepend(image);
      if ($(image).attr('data-prev') && $(image).attr('data-prev') != $(image).attr('src')) {
        $(navcontainer).prepend(prevnav);
      } else {
        $(navcontainer).prepend($.parseHTML('<div />'));
      }
      if ($(image).attr('data-next') && $(image).attr('data-next') != $(image).attr('src')) {
        $(navcontainer).append(nextnav);
      } else {
        $(navcontainer).append($.parseHTML('<div />'));
      }
      $(imagecontainer).append(navcontainer);
      $(container).append(imagecontainer);
      $('body').append(container);
    }


    $(".container-overlay").click(function () {
      remove();
    });

    //kann von irgendwo aufgerufen werden
    $(document).keydown(function (event) {
      console.log(event);
      if (event.key === "Escape") {
        remove();
        $(".overlay").remove();
      }
      if (event.key === "ArrowLeft") {
        prev();
      }
      if (event.key === "ArrowRight") {
        next();
      }
    });

    var remove = function () {
      $(".container-overlay").remove();
      //$(".overlay").remove();
    }

    $(document).on("click", ".image-container__nav__prev", function () {
      prev();
    });

    $(document).on("click", ".image-container__nav__next", function () {
      //$("body .image-container__nav__next").click(function(){
      next();
    });

    function prev() {
      var previmage = $(image).attr('data-prev');
      var next = $(".gallery").find(`img[src="${previmage}"]`).next().attr('src');
      var prev = $(".gallery").find(`img[src="${previmage}"]`).prev().attr('src');
      $(image).attr('data-prev', prev);
      $(image).attr('data-next', next);
      $(image).attr('src', previmage);
      addImageToContainer(image);
    }

    function next() {
      var nextimage = $(image).attr('data-next');
      var next = $(".gallery").find(`img[src="${nextimage}"]`).next().attr('src');
      var prev = $(".gallery").find(`img[src="${nextimage}"]`).prev().attr('src');
      $(image).attr('data-prev', prev);
      $(image).attr('data-next', next);
      $(image).attr('src', nextimage);
      addImageToContainer(image);
    }

  });

  //mehtod chaining for jquery
  return this;
  
}