/* Stacked layout for the three-brand comparison tables on small screens.
   Copies each column heading onto its cells so the CSS can label them, then opts the table in.
   Without this script the table keeps its horizontal-scroll layout. */
(function () {
  document.querySelectorAll('.bl-table--tri').forEach(function (t) {
    var heads = Array.prototype.map.call(t.querySelectorAll('thead th'), function (th) {
      var tag = th.querySelector('.bl-tri__tag');
      return (th.textContent || '').replace(tag ? tag.textContent : '', '').trim();
    });
    t.querySelectorAll('tbody tr').forEach(function (tr) {
      var col = 0;
      Array.prototype.forEach.call(tr.children, function (td) {
        if (td.colSpan === 1 && heads[col]) td.setAttribute('data-label', heads[col]);
        col += td.colSpan || 1;
      });
    });
    t.classList.add('bl-tri--stack');
  });
})();
