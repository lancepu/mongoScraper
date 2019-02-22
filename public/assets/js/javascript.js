$(document).ready(function() {
  $(".toggleSave").on("click", async function() {
    const postId = $(this)
      .parent(".cardBtnGroup")
      .attr("postId");
    try {
      await $.ajax({
        method: "PUT",
        url: `/save/${postId}`
      });
      window.location = "/saved";
    } catch (ex) {
      console.log(ex);
    }
  });

  $(".commentBtn").on("click", async function() {
    const postId = $(this)
      .parent(".cardBtnGroup")
      .attr("postId");
    window.location = `/${postId}`;
  });
});
