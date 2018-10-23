$(function() {
  $('[data-toggle="popover"]').popover()

  $("#datepicker").datepicker({
    altField: "#alternate",
    altFormat: "DD, d MM, yy"
  })

  $("#sortable").sortable({
    placeholder: "ui-state-highlight"
  })
  $("#sortable").disableSelection()
})