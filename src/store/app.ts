import { action, computed, makeAutoObservable, makeObservable } from 'mobx';
import { isClientSide } from '#/utils/env';

import type { IScrollRecord, IViewportRecord } from './types';
import type { ThemeVarious } from '../contexts/theme';
import { setCookie } from 'cookies-next';
import axios from 'axios';

interface IAppUIStore {
  theme: ThemeVarious;
  scroll: IScrollRecord;
  viewport: IViewportRecord;
  mediaType: 'screen' | 'print';
}

export default class AppUIStore {
  state = {
    theme: 'light',
    scroll: {} as IScrollRecord,
    viewport: {} as IViewportRecord,
    mediaType: 'screen'
  } as IAppUIStore;

  constructor() {
    makeObservable(this, {
      // ~ action
      setScroll: action,
      setViewport: action,
      setTheme: action,
      // ~ computed
      headerOpacity: computed,
      isOverFirstScreenHeight: computed,
      isOverPostTitleHeight: computed,
      isPadOrMobile: computed,
      isNarrowThanLaptop: computed
    });

    makeAutoObservable(this.state);
  }

  setScroll = (scroll: IScrollRecord): IScrollRecord => (this.state.scroll = scroll);
  setViewport = (viewport: IViewportRecord): IViewportRecord => (this.state.viewport = viewport);
  setTheme = (themeType: ThemeVarious): ThemeVarious => {
    setCookie('_THEME_', themeType);
    return (this.state.theme = themeType);
  };

  updateScroll() {
    const { pageYOffset } = window;

    this.setScroll({
      dir: null,
      pos: pageYOffset
    });
  }

  updateViewport() {
    const { innerHeight } = window;
    const { width } = document.documentElement.getBoundingClientRect();
    const { hpad, pad, mobile, h, w } = this.state.viewport;

    if (
      h &&
      // chrome mobile delta == 56
      Math.abs(innerHeight - h) < 80 &&
      width === w &&
      (hpad || pad || mobile)
    ) {
      return;
    }
    this.setViewport({
      w: width,
      h: innerHeight,
      mobile: window.screen.width <= 568 || window.innerWidth <= 568,
      pad: window.innerWidth <= 768 && window.innerWidth > 568,
      hpad: window.innerWidth <= 1100 && window.innerWidth > 768,
      wider: window.innerWidth > 1100 && window.innerWidth < 1920,
      widest: window.innerWidth >= 1920
    });
  }

  //* Axios
  addAxiosInterceptors = (): void => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log('error');

        if (error?.response?.status === 401) {
          // const urlCheckRegeExp = new RegExp(
          //   `/(login)|(${this.settings.NotificationsHubUrl})$`,
          //   'gi'
          // );
          // if (!urlCheckRegeExp.test(error.response.config.url)) {
          //   this.loginDialogControllerRef.current?.show({
          //     successLoginCallBack: (userInfo) => {
          //       this.userInfoControllerRef.current?.setUserInfo(userInfo, true);
          //       this.startHub();
          //     }
          //   });
          // }
        } else if (error?.response?.status === 403) {
          // this.modal?.showError({
          //   maxWidth: 700,
          //   message: 'Недостаточно прав доступа.'
          // });
        } else {
          // this.modal?.showError({
          //   maxWidth: 700,
          //   message:
          //     error?.response?.data?.message || error?.response?.data?.detail || error.toString()
          // });
        }
        return Promise.reject(error);
      }
    );

    axios.interceptors.request.use(
      (config) => {
        config.withCredentials = true;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };

  switchTheme = () => {
    const arr: ThemeVarious[] = ['blue', 'light', 'dark'];
    const i = arr.indexOf(this.state.theme);
    this.setTheme(arr[i === arr.length - 1 ? 0 : i + 1]);
  };

  get headerOpacity() {
    const { pos } = this.state.scroll;
    const threshold = 100;

    const opacity = pos >= threshold ? 0 : 1 - Math.floor((pos / threshold) * 100) / 100;

    return isNaN(opacity) ? 1 : opacity;
  }

  get isOverFirstScreenHeight(): boolean {
    const { pos } = this.state.scroll;

    if (!isClientSide()) {
      return false;
    }
    return pos > window.innerHeight || pos > screen.height;
  }

  get isOverPostTitleHeight(): boolean {
    const { pos } = this.state.scroll;

    if (!isClientSide()) {
      return false;
    }

    return pos > 126 || pos > screen.height / 3;
  }

  get isPadOrMobile() {
    const { pad, mobile } = this.state.viewport;

    return pad || mobile;
  }

  get isNarrowThanLaptop() {
    return this.isPadOrMobile || this.state.viewport.hpad;
  }
}
