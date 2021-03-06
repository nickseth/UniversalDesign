import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import Epub from 'epubjs';
import Book from 'epubjs/src/book';
import Rendition from 'epubjs/src/rendition';
import { NavItem } from 'epubjs/src/navigation';
import { ActionSheetController, Platform, IonContent } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NotesService } from './../services/notes.service';
import { AuthenticationService } from './../services/authentication.service';
import { ModalController } from '@ionic/angular';
import { CalculatorPage } from '../calculator/calculator.page';
import { GoogleSearchPage } from '../google-search/google-search.page';
import { Themes } from 'epubjs/src/themes';
import { DownloadedfileService } from '../services/localstorage/downloadedfile.service';
import { File } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ProductService } from '../services/product.service';
import { Location } from "@angular/common";
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-bookreader',
  templateUrl: './bookreader.page.html',
  styleUrls: ['./bookreader.page.scss'],
})
export class BookreaderPage implements OnInit {
  @ViewChild(IonContent) private content: IonContent;

  dragPosition: any = { x: 0, y: 0 };
  // popup: any = true;
  isClickBtn: any = false;
  book_id: any;
  data: any;
  // darkValue: any;
  fontSize: any;
  font_family: any;
  line_height: any;
  // description1 = null;
  // showShortDesciption = true;
  bookTitle = '';
  chapterTitle = '';
  book: Book;
  rendition: Rendition;
  chapters: NavItem[];
  themes: Themes;
  navOpen: Boolean;
  currentChapter: any;
  // sessionId: string;
  // pollInterval: any;
  // theme_color: any;
  // curr_location: any;
  // bookmarkTitle: any;
  bookmarks: any;
  // spine1: any;
  // product_ones: any;
  book_bookmark_highlight: any;
  bookmarkData: any;
  bookmarks_index: any;
  bookmark_highlightData: any;
  token: any;
  sele_Range: any;
  // selctedtext: any = '';

  list22: string[];
  private win: any = window;
  selected_txt: any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private storage: Storage
    , public actionSheetController: ActionSheetController,
    public alertController: AlertController
    , public notesService: NotesService,
    private authenticationService: AuthenticationService,
    public modalController: ModalController,
    public file: File,
    private androidPermissions: AndroidPermissions,
    public productdata: ProductService,
    private localdownload: DownloadedfileService,
    public platform: Platform,
    private location: Location,
    private menu: MenuController
  ) {


    this.storage.create();
    this.authenticationService.getToken().then(val => {
      this.token = val.value;
    })

    setTimeout(() => {
      document.getElementById("defaultOpen2").click();
    }, 1000);

  }

  async presentActionSheet(cfiurl, text) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Action',
      cssClass: 'my-custom-class32',
      buttons: [{
        text: 'Add Highlight',
        icon: 'add',
        handler: () => {
          this.rendition.annotations.add('highlight', cfiurl, {}, (e) => {
            this.book_highlight(cfiurl, text);
          }, "hl", { "fill": "yellow", "fill-opacity": "0.3", "mix-blend-mode": "multiply" });
          this.book_bookmark_highlight = this.storage.get('bookmark' + this.book_id);
          let list_bookmarks = { book_id: 12, type: "highlight", location: cfiurl, bookChapter: this.currentChapter.label, text: text }

          this.book_bookmark_highlight.then(val => {

            if (val != null) {
              val.push(list_bookmarks);
              this.storage.set('bookmark' + this.book_id, this.book_bookmark_highlight);
              setTimeout(() => {
                this.showbookmark();
              }, 1000);
            } else {

              this.book_bookmark_highlight = [];
              this.book_bookmark_highlight.push(list_bookmarks);
              this.storage.set('bookmark' + this.book_id, this.book_bookmark_highlight);
              
              setTimeout(() => {
                this.showbookmark();
              }, 1000);
            }
          })
        }
      },
      {
        text: 'Remove Highlights',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          
          // if (index != null) {
            let book = this.storage.get('bookmark' + this.book_id);
            book.then(val => {
              let index = val.findIndex((rank, index) => rank.location === cfiurl && rank.type === "highlight");
              val.splice(index, 1);
              this.storage.set('bookmark' + this.book_id, book);
              this.rendition.annotations.remove(cfiurl, "highlight");
             
              setTimeout(() => {
                this.showbookmark();
              }, 1000);
            })



          // } else {
          //   this.rendition.annotations.remove(cfiurl, "highlight");
          //   setTimeout(() => {
          //     this.showbookmark();
          //   }, 1000);
          //   return this.rendition.display(cfiurl);
          // }
        }
      },
      {
        text: 'Create Notes',
        icon: 'create',
        handler: () => {
          if (cfiurl) {

            this.Modelopener(text);
          }
        }
      }
        , {
        text: 'Google',
        icon: 'logo-google',
        handler: () => {
          this.presentModal2(text);
        }
      }, {
        text: 'Wikipedia',
        icon: 'globe-outline',
        handler: () => {
          this.presentModal3(text);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {

        }
      }]
    });
    await actionSheet.present();
    const { role } = await actionSheet.onDidDismiss();
  }
  book_highlight(cfiRange, text) {
    this.presentActionSheet(cfiRange, text);

  }

  // ionViewWillEnter() {
  //   console.log(this.content.scrollToTop());
  // }
  ngOnInit() {

    document.getElementById("defaultOpen2").click();
    this.book_id = this.route.snapshot.paramMap.get('id');


    this.localdownload.getDownloadedBookLocation().then(val => {
      if (val != null) {
        let index_book = val.findIndex(p => p.id == this.book_id);
        let bkdata = val[index_book].book_location;
        this.epubFileReader(bkdata);
      }


    })

    // this.epubFileReader(this.book_id);

    // this.epubFileReader();


  }

  async epubFileReader(urlbook) {
    let urls_for_read = this.platform.is('android') ? this.file.cacheDirectory + "UniversalApp/" + urlbook : this.file.documentsDirectory + "UniversalApp/" + urlbook;
    let newPath = this.win.Ionic.WebView.convertFileSrc(urls_for_read);
    console.log("this new url" + newPath);
    this.book = await Epub(newPath, { replacements: "blobUrl" });
    // this.book = Epub('https://standardebooks.org/ebooks/robert-louis-stevenson/treasure-island/downloads/robert-louis-stevenson_treasure-island.epub');

    // "https://standardebooks.org/ebooks/robert-louis-stevenson/treasure-island/downloads/robert-louis-stevenson_treasure-island.epub"
  // this.book = Epub('https://universalbooks.wpengine.com/wp-content/uploads/woocommerce_uploads/2021/07/orczy-old-man-in-the-corner-pfomdx.epub');
    this.rendition = await this.book.renderTo('viewer', { 
      width: "100%",
      height: "100%",
      // script: 'allow-scripts',
      allowScriptedContent: true,
    });
    let current_location222 = this.storage.get('current_location' + this.book_id);
  
    current_location222.then(val => {
      console.log(val)
      if (val != null) {
        this.rendition.display(val.location);
      } else {
        this.rendition.display();
      }
    });
    await this.rendition.display();
    this.navOpen = false;
    await this.rendition.on('rendered', (section) => {
      this.currentChapter = this.book.navigation.get(section.href);
    });


    let touchStart = 0;
    let touchEnd = 0;

    this.rendition.on('touchstart', event => {
      touchStart = event.changedTouches[0].screenX;
    });

    this.rendition.on('touchend', event => {
      touchEnd = event.changedTouches[0].screenX;
      if (touchStart < touchEnd) {

        this.showPrev();
      }
      if (touchStart > touchEnd) {
        this.showNext();
      }
    });
 
    await this.rendition.hooks.content.register((contents) => {
      // contents.addScript("../../assets/js/jquery.min.js"),
      // contents.addScript("../../assets/js/turn.min.js"),
      // contents.addScript("../../assets/js/trn.js"),
      contents.addStylesheet("../../assets/css/theme.css")
     
    });




    await this.rendition.on('relocated', (location) => {

      let locationCfi = location.start.cfi;
      let spineItem = this.book.spine.get(locationCfi);
      let navItem = this.book.navigation.get(spineItem.href);
      if (navItem != undefined) {
        this.chapterTitle = navItem.label;
      }

    });


    await this.storage.get('dark2').then((ev) => {
      // this.rendition.themes.default({ "body": { "column-gap": "153px" } });
      if (ev == null) {

        document.querySelector(`#light`).classList.add('active_theme_btn');
        // this.storage.set('dark2', 'light');
        this.rendition.themes.select("light1");
        document.querySelector('#main-book-section').classList.remove('lite_dark');
        document.querySelector('#main-book-section').classList.remove('dark2');
        document.querySelector('#main-book-section').classList.remove('blue');
        document.querySelector('#main-book-section').classList.remove('lite_white');
        document.querySelector('#main-book-section').classList.remove('lite_blue');

        document.querySelector('#main-book-section2').classList.remove('lite_dark');
        document.querySelector('#main-book-section2').classList.remove('dark2');
        document.querySelector('#main-book-section2').classList.remove('blue');
        document.querySelector('#main-book-section2').classList.remove('lite_white');
        document.querySelector('#main-book-section2').classList.remove('lite_blue');

      } else {
        document.querySelector(`#${ev}`).classList.add('active_theme_btn');
        if (ev == 'dark') {
          this.rendition.themes.select("dark1");

          document.querySelector('#main-book-section').classList.add('dark2');
          document.querySelector('#main-book-section').classList.remove('lite_blue');
          document.querySelector('#main-book-section').classList.remove('blue');
          document.querySelector('#main-book-section').classList.remove('lite_white');
          document.querySelector('#main-book-section').classList.remove('lite_dark');

          document.querySelector('#main-book-section2').classList.add('dark2');
          document.querySelector('#main-book-section2').classList.remove('lite_blue');
          document.querySelector('#main-book-section2').classList.remove('blue');
          document.querySelector('#main-book-section2').classList.remove('lite_white');
          document.querySelector('#main-book-section2').classList.remove('lite_dark');

        }
        if (ev == 'lite_blue') {
          this.rendition.themes.select("lite_blue");
          document.querySelector('#main-book-section').classList.add('lite_blue');
          document.querySelector('#main-book-section').classList.remove('dark2');
          document.querySelector('#main-book-section').classList.remove('blue');
          document.querySelector('#main-book-section').classList.remove('lite_white');
          document.querySelector('#main-book-section').classList.remove('lite_dark');

          document.querySelector('#main-book-section2').classList.add('lite_blue');
          document.querySelector('#main-book-section2').classList.remove('dark2');
          document.querySelector('#main-book-section2').classList.remove('blue');
          document.querySelector('#main-book-section2').classList.remove('lite_white');
          document.querySelector('#main-book-section2').classList.remove('lite_dark');

        }
        if (ev == 'blue') {
          this.rendition.themes.select("blue");
          document.querySelector('#main-book-section').classList.add('blue');
          document.querySelector('#main-book-section').classList.remove('dark2');
          document.querySelector('#main-book-section').classList.remove('lite_blue');
          document.querySelector('#main-book-section').classList.remove('lite_white');
          document.querySelector('#main-book-section').classList.remove('lite_dark');

          document.querySelector('#main-book-section2').classList.add('blue');
          document.querySelector('#main-book-section2').classList.remove('dark2');
          document.querySelector('#main-book-section2').classList.remove('lite_blue');
          document.querySelector('#main-book-section2').classList.remove('lite_white');
          document.querySelector('#main-book-section2').classList.remove('lite_dark');

        }
        if (ev == 'lite_white') {
          this.rendition.themes.select("lite_white");
          document.querySelector('#main-book-section').classList.add('lite_white');
          document.querySelector('#main-book-section').classList.remove('dark2');
          document.querySelector('#main-book-section').classList.remove('lite_blue');
          document.querySelector('#main-book-section').classList.remove('blue');
          document.querySelector('#main-book-section').classList.remove('lite_dark');

          document.querySelector('#main-book-section2').classList.add('lite_white');
          document.querySelector('#main-book-section2').classList.remove('dark2');
          document.querySelector('#main-book-section2').classList.remove('lite_blue');
          document.querySelector('#main-book-section2').classList.remove('blue');
          document.querySelector('#main-book-section2').classList.remove('lite_dark');

        }
        if (ev == 'lite_dark') {
          this.rendition.themes.select("lite_dark");
          document.querySelector('#main-book-section').classList.add('lite_dark');
          document.querySelector('#main-book-section').classList.remove('dark2');
          document.querySelector('#main-book-section').classList.remove('lite_blue');
          document.querySelector('#main-book-section').classList.remove('blue');
          document.querySelector('#main-book-section').classList.remove('lite_white');

          document.querySelector('#main-book-section2').classList.add('lite_dark');
          document.querySelector('#main-book-section2').classList.remove('dark2');
          document.querySelector('#main-book-section2').classList.remove('lite_blue');
          document.querySelector('#main-book-section2').classList.remove('blue');
          document.querySelector('#main-book-section2').classList.remove('lite_white');

        }
        if (ev == 'light') {
          this.rendition.themes.select("light1");
          document.querySelector('#main-book-section').classList.remove('lite_dark');
          document.querySelector('#main-book-section').classList.remove('dark2');
          document.querySelector('#main-book-section').classList.remove('blue');
          document.querySelector('#main-book-section').classList.remove('lite_white');
          document.querySelector('#main-book-section').classList.remove('lite_blue');

          document.querySelector('#main-book-section2').classList.remove('lite_dark');
          document.querySelector('#main-book-section2').classList.remove('dark2');
          document.querySelector('#main-book-section2').classList.remove('blue');
          document.querySelector('#main-book-section2').classList.remove('lite_white');
          document.querySelector('#main-book-section2').classList.remove('lite_blue');


        }
      }

    });


    this.storage.get('fontSizefor').then((val) => {

      if (val != null) {
        document.querySelector(`#fsize${val}`).classList.add('active_theme_btn');
        this.fontSize = val;
        setTimeout(() => {
          document.getElementById("fsize" + this.fontSize).classList.add("fsizecol");
          this.rendition.themes.fontSize(this.fontSize + "pt");


        }, 1000);
      } else {
        this.storage.set('fontSizefor', 8);
        document.querySelector(`#fsize8`).classList.add('active_theme_btn');
        document.getElementById("fsize8").classList.add("fsizecol");
        this.rendition.themes.fontSize(8 + "pt");
      }
    });
    this.storage.get('font_family').then((val) => {

      if (val != null) {
        this.font_family = val;
        document.querySelector(`#ffamily_${val}`).classList.add('active_theme_btn');
        setTimeout(() => {
          document.getElementById("ffamily_" + this.font_family).classList.add("fsizecol");
          this.rendition.themes.font(this.font_family);
        }, 1000);
      } else {
        this.storage.set('font_family', 'times_new_roman');
        document.querySelector(`#ffamily_times_new_roman`).classList.add('active_theme_btn');
        document.getElementById("ffamily_Arial").classList.add("fsizecol");
        this.rendition.themes.font("times_new_roman");
        this.font_family = "times_new_roman";

      }
    });
    this.storage.get('line_height').then((val) => {
      if (val != null) {
        this.line_height = val;
        document.getElementById(`linespacing${val}`).classList.add('active_theme_btn');
        setTimeout(() => {
          document.getElementById("linespacing" + this.line_height).classList.add("fsizecol");
          this.rendition.themes.default({ "body": { "line-height": this.line_height } });
        }, 1000);
      } else {
        this.storage.set('line_height', 1);
        document.getElementById(`linespacing1`).classList.add('active_theme_btn');
        document.getElementById("linespacing1").classList.add("fsizecol");
        this.rendition.themes.default({ "body": { "line-height": 1 } });
      }
    });
    await this.book.loaded.spine.then(spine => {

      spine.each(item => {

        var current = this.book.navigation.get(item.href);

        if (current != undefined) {
          var ion_item1 = document.createElement("ion-item");
          ion_item1.innerHTML = current.label;
          ion_item1.className = 'chapters';
          ion_item1.id = item.href;
          ion_item1.style.padding = "5px";
          ion_item1.onclick = () => {
            this.chapterTitle = current.label;
            this.storage.set('current_location' + this.book_id, item.href);
            this.displayChapterOne(event, item.href);
            this.menu.close();
          }
          var cpt = document.querySelector('#chapter');
          cpt.append(ion_item1);
        }

      });
    });

    this.storeChapters();
    this.book.loaded.metadata.then(meta => {
      // console.log(meta);
      this.bookTitle = meta.title;

    });
 
    this.rendition.on("rendered", (e, i) => {
      this.rendition.on('selected', (cfiRange, contents) => {
        this.sele_Range = cfiRange;
       
        //   contents.window.getSelection().removeAllRanges();
      });
    
      i.document.documentElement.addEventListener('contextmenu', (event: MouseEvent) => {
        event.preventDefault();
       
        this.selected_txt = i.window.getSelection().toString();

        setTimeout(() => {
          let selector_menu = document.getElementById("selected_text_menu");
          selector_menu.style.display = "block"
        }, 1000);
      })
      i.document.documentElement.addEventListener('click', () => {
        let selector_menu = document.getElementById("selected_text_menu");
        selector_menu.style.display = "none";

        this.isClickBtn = !this.isClickBtn;
        if (this.isClickBtn) {
          document.getElementById('next').classList.remove("active");
          document.getElementById('prev').classList.remove("active");
          document.getElementById("prev").style.display = "block";
          document.getElementById("next").style.display = "block";
        } else {
          document.getElementById("prev").style.display = "none";
          document.getElementById("next").style.display = "none";
        }
      })

    });
   
    ///theme background change------------------------------------------
    this.rendition.themes.register("dark1",
      {
        "body": { "background-color": "#111111", "color": "#ffffff" }
      });

    this.rendition.themes.register("blue1",
      {
        "body": { "background-color": "rgb(51, 51, 51)", "color": "rgb(238, 238, 238)" }
      });

    this.rendition.themes.register("lite_white",
      {
        "body": { "background-color": "rgb(245, 222, 179)", "color": "rgb(0, 0, 0)" }
      });

    this.rendition.themes.register("lite_dark",
      {
        "body": { "background-color": "rgb(17, 17, 17)", "color": "rgb(245, 222, 179)" }
      });

    this.rendition.themes.register("lite_blue",
      {
        "body": { "background-color": "rgb(17, 27, 33)", "color": "rgb(232, 232, 232)", "overflow-x": "hidden" }
      });

    this.rendition.themes.register("light1",
      {
        "body": { "background-color": "#ffffff", "color": "#000000", "overflow-x": "hidden" }
      });

    this.rendition.on('relocated', (location) => {
      this.storage.get('bookmark' + this.book_id).then((val) => {

        if (val != null) {
          if (val.some(item => item.location === location.start.cfi)) {

            this.bookmarkData = true;
            this.bookmarks_index = location.start.cfi;
  
          } else {
            this.bookmarkData = false;
          }
        }
      });
    });

    this.storage.get('bookmark' + this.book_id).then((val) => {
      if (val != null) {
        var result = val.filter((item) => {
          return item.type == 'highlight';
        });
        result.forEach((element, index) => {
          this.rendition.annotations.add('highlight', element.location, {}, (e) => {  
            this.presentActionSheet(element.location, element.text);
          }, "hl", { "fill": "yellow", "fill-opacity": "0.3", "mix-blend-mode": "multiply" });
        });
      }
    })

    window.addEventListener("unload", () => {
      this.book.destroy();
    });
  }

  displayChapterOne(env, item) {
    // let current_location = this.rendition.currentLocation();
    let i;
    let tablinks = document.getElementsByClassName("chapters");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" item_active", "");
    }

    env.currentTarget.className += " item_active";
    this.rendition.display(item)

  }

  setbookmark() {
    let current_location = this.rendition.currentLocation();
    this.book_bookmark_highlight = this.storage.get('bookmark' + this.book_id);
    let curr_label = "";
    if (this.currentChapter.label != undefined) {
      curr_label = this.currentChapter.label;
    } else {
      curr_label = "No Title Found";
    }
    console.log(current_location)
    let list_bookmarks = { book_id: this.book_id, type: "bookmark", location: current_location.start.cfi, bookChapter: curr_label }

    this.book_bookmark_highlight.then(val => {
      this.bookmarks_index = current_location.start.cfi;
      if (val != null) {

        val.push(list_bookmarks);
        this.storage.set('bookmark' + this.book_id, this.book_bookmark_highlight);
      } else {

        this.book_bookmark_highlight = [];
        this.book_bookmark_highlight.push(list_bookmarks);
        this.storage.set('bookmark' + this.book_id, this.book_bookmark_highlight);
      }
    })

    this.bookmarkData = true;

    setTimeout(() => {
      this.showbookmark();
    }, 1000);
  }
  async showbookmark() {

    var highlights = document.getElementById('highlights');
    await this.storage.get('bookmark' + this.book_id).then((val) => {
      this.bookmark_highlightData = val;
    });
  }
  deletehighlight(item) {

    this.book_bookmark_highlight = this.storage.get('bookmark' + this.book_id);
    this.book_bookmark_highlight.then(val => {

      let index = val.findIndex((rank, index) => rank.location === item && rank.type === "highlight");

      if (index >= 0) {

        val.splice(index, 1);
        this.storage.set('bookmark' + this.book_id, this.book_bookmark_highlight);
        this.rendition.annotations.remove(item, "highlight");
        this.rendition.display(item);
        setTimeout(() => {
          this.showbookmark();
        }, 1000);
      }

    })

  }

  deletebookmark(item) {
console.log(item);
    this.book_bookmark_highlight = this.storage.get('bookmark' + this.book_id);
    this.book_bookmark_highlight.then(val => {
      let index = val.findIndex((rank, index) => rank.location === item && rank.type === "bookmark");

      if (index >= 0) {
        val.splice(index, 1);
        this.storage.set('bookmark' + this.book_id, this.book_bookmark_highlight);
        this.bookmarkData = false;
        setTimeout(() => {
          this.showbookmark();
        }, 1000);
      } else {
        this.deletehighlight(item);
      }
    })
  }

  openAction(text, range) {
    this.book_highlight(range, text);
    let selector_menu = document.getElementById("selected_text_menu");
    selector_menu.style.display = "none"
  }

  showNext() {
    document.getElementById('next').classList.add("active");
    document.getElementById('prev').classList.remove("active");
    // console.log()
    // this.rendition.on('relocated', (location) => {
    let loca = this.rendition.currentLocation();
    if (loca.start) {
      this.storage.set('current_location' + this.book_id, { location: loca.start.cfi });
      this.rendition.next();
    }
  }
  showPrev() {
    document.getElementById('next').classList.remove("active");
    document.getElementById('prev').classList.add("active");
    // this.rendition.on('relocated', (location) => {
    let loca = this.rendition.currentLocation();
    if (loca.start) {
      this.storage.set('current_location' + this.book_id, { location: loca.start.cfi });
      this.rendition.prev();
    }


  }



  toggleNav() {
    this.navOpen = !this.navOpen;
    console.log(this.navOpen);
  }

  displayChapter(chapter: any) {
    this.currentChapter = chapter;
    console.log(this.currentChapter);
    this.rendition.display(chapter.href);
  }


  private storeChapters() {
    this.book.loaded.navigation.then(navigation => {
      this.chapters = navigation.toc;

    });
  }


  setFontSize(item) {

    let clls = document.getElementsByClassName("btn-cls-fsize");
    let i;
    for (i = 0; i < clls.length; i++) {
      clls[i].classList.remove('active_theme_btn');
    }
    document.querySelector(`#fsize${item}`).classList.add('active_theme_btn');



    this.storage.set('fontSizefor', item);

    this.storage.get('fontSizefor').then((val) => {

      if (item == val) {

        document.getElementById("fsize" + item).classList.add("fsizecol");

      } else {
        document.getElementById("fsize" + val).classList.remove("fsizecol");
        document.getElementById("fsize" + item).classList.add("fsizecol");
        this.rendition.themes.fontSize(item + "pt");
      }

    });
  }

  setFontFamily(family_item) {
    let clls = document.getElementsByClassName("btn-font-cls");
    let i;
    for (i = 0; i < clls.length; i++) {
      clls[i].classList.remove('active_theme_btn');
    }
    document.querySelector(`#ffamily_${family_item}`).classList.add('active_theme_btn');

    this.storage.set('font_family', family_item);

    this.font_family = family_item;
    this.storage.get('font_family').then((val) => {
      console.log("value" + val)
      if (family_item == val) {

        this.font_family = val;
        document.getElementById("ffamily_" + family_item).classList.add("ion-activated");
        this.rendition.themes.font(this.font_family);
      } else {
        // console.log("click se" + family_item)
        document.getElementById("ffamily_" + val).classList.remove("ion-activated");
        document.getElementById("ffamily_" + family_item).classList.add("ion-activated");
        this.font_family = family_item;
        this.rendition.themes.font(family_item);
      }

    });
  }

  setlineSpacing(spacing) {
    let clls = document.getElementsByClassName("btn-spline-cls");
    let i;
    for (i = 0; i < clls.length; i++) {
      clls[i].classList.remove('active_theme_btn');
    }
    document.getElementById(`linespacing${spacing}`).classList.add('active_theme_btn');

    this.storage.set('line_height', spacing);

    this.storage.get('line_height').then((val) => {

      if (spacing == val) {

        document.getElementById("linespacing" + spacing).classList.add("fsizecol");

      } else {
        document.getElementById("linespacing" + val).classList.remove("fsizecol");
        document.getElementById("linespacing" + spacing).classList.add("fsizecol");
        //  document.getElementById('item-description').style.setProperty(`line-height`, spacing);
        this.rendition.themes.default({ "body": { "line-height": spacing } });

      }

    });
  }
  openCity(evt, cityName) {

    // console.log(evt)
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";

    evt.currentTarget.className += " active";
  }


  setTheme2(ev) {
    let clls = document.getElementsByClassName("color-theme");
    let i;
    for (i = 0; i < clls.length; i++) {
      clls[i].classList.remove('active_theme_btn');
    }
    document.querySelector(`#${ev}`).classList.add('active_theme_btn');

    if (ev == 'dark') {
      this.rendition.themes.select("dark1");

      // document.body.classList.add('dark');
      document.querySelector('#main-book-section').classList.add('dark2');
      document.querySelector('#main-book-section').classList.remove('lite_blue');
      document.querySelector('#main-book-section').classList.remove('blue');
      document.querySelector('#main-book-section').classList.remove('lite_white');
      document.querySelector('#main-book-section').classList.remove('lite_dark');

      document.querySelector('#main-book-section2').classList.add('dark2');
      document.querySelector('#main-book-section2').classList.remove('lite_blue');
      document.querySelector('#main-book-section2').classList.remove('blue');
      document.querySelector('#main-book-section2').classList.remove('lite_white');
      document.querySelector('#main-book-section2').classList.remove('lite_dark');



    } if (ev == 'lite_blue') {
      this.rendition.themes.select("lite_blue");
      document.querySelector('#main-book-section').classList.add('lite_blue');
      document.querySelector('#main-book-section').classList.remove('dark2');
      document.querySelector('#main-book-section').classList.remove('blue');
      document.querySelector('#main-book-section').classList.remove('lite_white');
      document.querySelector('#main-book-section').classList.remove('lite_dark');

      document.querySelector('#main-book-section2').classList.add('lite_blue');
      document.querySelector('#main-book-section2').classList.remove('dark2');
      document.querySelector('#main-book-section2').classList.remove('blue');
      document.querySelector('#main-book-section2').classList.remove('lite_white');
      document.querySelector('#main-book-section2').classList.remove('lite_dark');


    } if (ev == 'blue') {
      this.rendition.themes.select("blue1");
      document.querySelector('#main-book-section').classList.add('blue');
      document.querySelector('#main-book-section').classList.remove('dark2');
      document.querySelector('#main-book-section').classList.remove('lite_blue');
      document.querySelector('#main-book-section').classList.remove('lite_white');
      document.querySelector('#main-book-section').classList.remove('lite_dark');

      document.querySelector('#main-book-section2').classList.add('blue');
      document.querySelector('#main-book-section2').classList.remove('dark2');
      document.querySelector('#main-book-section2').classList.remove('lite_blue');
      document.querySelector('#main-book-section2').classList.remove('lite_white');
      document.querySelector('#main-book-section2').classList.remove('lite_dark');



    } if (ev == 'lite_white') {
      this.rendition.themes.select("lite_white");
      document.querySelector('#main-book-section').classList.add('lite_white');
      document.querySelector('#main-book-section').classList.remove('dark2');
      document.querySelector('#main-book-section').classList.remove('lite_blue');
      document.querySelector('#main-book-section').classList.remove('blue');
      document.querySelector('#main-book-section').classList.remove('lite_dark');


      document.querySelector('#main-book-section2').classList.add('lite_white');
      document.querySelector('#main-book-section2').classList.remove('dark2');
      document.querySelector('#main-book-section2').classList.remove('lite_blue');
      document.querySelector('#main-book-section2').classList.remove('blue');
      document.querySelector('#main-book-section2').classList.remove('lite_dark');



    } if (ev == 'lite_dark') {
      this.rendition.themes.select("lite_dark");
      document.querySelector('#main-book-section').classList.add('lite_dark');
      document.querySelector('#main-book-section').classList.remove('dark2');
      document.querySelector('#main-book-section').classList.remove('lite_blue');
      document.querySelector('#main-book-section').classList.remove('blue');
      document.querySelector('#main-book-section').classList.remove('lite_white');


      document.querySelector('#main-book-section2').classList.add('lite_dark');
      document.querySelector('#main-book-section2').classList.remove('dark2');
      document.querySelector('#main-book-section2').classList.remove('lite_blue');
      document.querySelector('#main-book-section2').classList.remove('blue');
      document.querySelector('#main-book-section2').classList.remove('lite_white');

    }
    if (ev == 'light') {
      this.rendition.themes.select("light1");
      document.querySelector('#main-book-section').classList.remove('lite_dark');
      document.querySelector('#main-book-section').classList.remove('dark2');
      document.querySelector('#main-book-section').classList.remove('blue');
      document.querySelector('#main-book-section').classList.remove('lite_white');
      document.querySelector('#main-book-section').classList.remove('lite_blue');

      document.querySelector('#main-book-section2').classList.remove('lite_dark');
      document.querySelector('#main-book-section2').classList.remove('dark2');
      document.querySelector('#main-book-section2').classList.remove('blue');
      document.querySelector('#main-book-section2').classList.remove('lite_white');
      document.querySelector('#main-book-section2').classList.remove('lite_blue');
    }

    localStorage.test = ev;
    this.storage.set('dark2', ev);

  }

  async Modelopener(val) {
    const alert = await this.alertController.create({
      inputs: [
        {
          name: 'notesName',
          placeholder: 'Notes Title'
        },
        {
          name: 'selected text',
          type: 'textarea',
          value: val,
        }
      ],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Ok',
        handler: data => {
          this.saveModal(val, data.notesName);
        }
      }
      ]

    });
    await alert.present();
  }
  saveModal(val, title) {
    if (this.token) {
      var notesData = { 'token': this.token, 'title': title, 'description': val };
      this.notesService.addNotes(notesData);
    } else {
      alert('Something Wrong');
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CalculatorPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      animated: true,
      presentingElement: await this.modalController.getTop()
    });
    return await modal.present();
  }

  async presentModal2(txt) {
    const modal = await this.modalController.create({
      component: GoogleSearchPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'googletext': txt,

      }
    });
    return await modal.present();
  }

  async presentModal3(txt) {
    const modal = await this.modalController.create({
      component: GoogleSearchPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'wikitext': txt,
      }
    });
    return await modal.present();
  }
  myBackButton() {
    this.location.back();
  }
}
