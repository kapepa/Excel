import { createHTML } from "../createHTML";
import ActiveRouter from "./activeRouter";
import { utility } from '../../core/utility';

class Router{
	changeHashRouter: any;
	selectore: string;
	pagelist: any;
	rootEl: HTMLElement;
	curPage: any;
	constructor(selectore: string, pagelist: Object){
		this.changeHashRouter = this.hashRouter.bind(this);
		this.selectore = selectore;
		this.rootEl = undefined;
		this.pagelist = pagelist;
		this.curPage = null
		this.init();
	}

	hashRouter(event: any){
		let hash = ActiveRouter.param("first")
		let first = Object.keys(this.pagelist)[0]
		let Page = this.pagelist[hash] || this.pagelist[first];
		if(this.curPage) this.curPage.destroy()

		this.clearRoot();

		if(this.pagelist[hash] || hash.length === 0){
			Page = new Page({router: ActiveRouter}).rootStart();
			this.curPage = Page;
			this.rootEl.appendChild(Page.render())
			Page.initAction();
		}else{
			let err = createHTML("div");
			err.innerHTML = "<h2>Such page not exist!</h2>"
			this.rootEl.appendChild(err);
		}
	}

	clearRoot(){
		this.rootEl.innerHTML = ""
	}

	init(){
		this.rootEl = document.querySelector(this.selectore);
		window.addEventListener("hashchange",this.changeHashRouter);
		this.changeHashRouter()
	}

	destroy(){
		window.removeEventListener("hashchange",this.changeHashRouter)
	}

}

export default Router;