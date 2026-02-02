import "/global/components/universal-filter/universal-filter.js";
import "./filter.less";

const sharedCustomFilterSettings = {
  position: "top",
  align: "center",
  collectionUrl: "/blog",
  runOnDOMReady: true,
  showItemsCount: false,
  /*itemsCount: {
    enabled: false,
    text: "Touren: ",
    positionOrder: 1000,
  },*/
  //placeFiltersTo: detail ? "" : "#filterwrapper .content > div",
  showCheckboxes: true, // show the styled checkboxes with options
  noResultMessage:
    "<h3 style='text-align: center;'>Es gibt leider keine Einträge mit diesen Einstellungen</h3>", //html sting to show if no results found {filter}, {search}
  keepDropdownsOpenOnInit: false,
  closeOptionsOnSelect: false,
  closeOnMouseOut: true, // close dropdowns after cursor leaving
  accordionDropdowns: true, // if true, others dropdowns closed on current one opens
  customClasses: "cf-ctrls-inline",
  view: "dropdowns",
  sticky: {
    enabled: false,
  },

  simpleFilter: {
    show: {
      effect: "fade",
      transitionDuration: 300,
      stagger: 60,
    },
    hide: {
      effect: "fade",
      transitionDuration: 100,
      stagger: 18,
    },
  },

  //initState: getFiltersFromUrl(),
  initState: {},

  shuffle: false,
  useHistory: true,
  urlQuery: true,

  /*----Options and Options Counters Section----*/
  updateFilterOptions: {
    enabled: false, //enable options update
    nonExistOptions: {
      hide: false, //if true - completely hide those that produce No results
      disable: false, // fade out not-exists
      //disableHard: true, //fade out and make not clickable
      //moveBottom: true, // in plans
    },
    showOptionsCounters: false, // if true - you will see a number of available items there
    optionsCounterWrap: " ()", // available items number will be pasted inside circle brackets
  },

  /*----Filter Pagination (Load More) Section----*/
  pagination: {
    //enabling pagination allows to show less items on page and even improve page loading if many items with images used
    enabled: false, //disabled by default, set true to enable
    pageSize: 15, // create pagination buttons

    loadMoreButton: {
      enabled: false, // if enabled - will show you Load more button, no pages
      text: "Mehr Laden",
      alignment: "center",
      size: "small",
      ignoreLZSSetings: true, //ignore Lazy Summaries Settings if true
    },
  },

  mobilePanel: {
    enabled: false,
    triggerButtonName: "Filter",
    keepDropdownsOpen: null,
    closeOnSelect: false,
    closeOnSearch: false,
    closeOnOutsideClick: false,
  },

  filter: {
    category: false,
    tag: false,
    cacheOptions: true,
    followNewProductsCategories: true,
    items: [
      {
        hidden: false,
        name: "Branche",
        allOption: "Alle",
        //multipleLogic: "AND", // combine each selected category with OR or AND logic
        getAttr: "categories",
        allowedPrefSuf: "Branche:", //each category starting from Industrie: will be showed in dropdown
      },
      {
        name: "Service",
        allOption: "Alle",
        multiple: true,
        //multipleLogic: "AND", // combine each selected category with OR or AND logic
        getAttr: "categories",

        allowedPrefSuf: "Service:", //each category starting from Service: will be showed in dropdown
      },

      {
        name: "Typ",
        allOption: "Alle",
        multiple: true,
        //multipleLogic: "AND", // combine each selected category with OR or AND logic
        getAttr: "tags",
      },
    ],
  },

  sort: {
    enabled: false,
    title: "Sortierung",
    hideValueLabel: true,
    items: [
      {
        name: "Empfohlene",
        order: "asc|desc",
        orderTexts: "Aufsetigen|Absteigend",
        hideName: false,
        sort: "[data-index] parseInt",
      },
      {
        name: "Titel",
        order: "asc|desc",
        orderTexts: "Aufsteigend|Absteigend",
        hideName: false,
        sort: ".summary-title-link",
      },
    ],
  },

  search: {
    enabled: false,
    positionOrder: 0,
    text: "Erlebnis finden",
    searchFunc: "title|tags|categories|body",
  },
};

window.customFilterSettings = {
  targets: [
    {
      // Portfolio
      container:
        ".view-list .page-section[class*='collection-type-blog-'] div[data-controller]",
      items: "article",
      settings: { ...sharedCustomFilterSettings },
    },
    {
      container: "#block-yui_3_17_2_1_1751911535858_9578", // Portfolio
      items: ".summary-item",
      settings: {
        ...sharedCustomFilterSettings,
        filter: {
          ...sharedCustomFilterSettings.filter,
          items: [
            {
              hidden: false,
              name: "Branche",
              allOption: "Alle",
              //multipleLogic: "AND", // combine each selected category with OR or AND logic
              getAttr: "categories",
              allowedPrefSuf: "Branche:", //each category starting from Industrie: will be showed in dropdown
            },
            {
              name: "Service",
              allOption: "Alle",
              multiple: true,
              //multipleLogic: "AND", // combine each selected category with OR or AND logic
              getAttr: "categories",

              allowedPrefSuf: "Service:", //each category starting from Service: will be showed in dropdown
            },
          ],
        },
      },
    },
    {
      container: "#block-8edd2b11725feb5e6171", // Artikel
      items: ".summary-item",
      settings: {
        ...sharedCustomFilterSettings,
        filter: {
          ...sharedCustomFilterSettings.filter,
          items: [], // Removes all items
        },
        search: {
          enabled: true, // Changed to true
          positionOrder: 0,
          text: "Artikel finden",
          searchFunc: "title|tags|categories|body",
        },
      },
    },
  ],
};
