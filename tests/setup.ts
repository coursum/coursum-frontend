import Vue from 'vue';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex';

Vue.use(Vuetify);
Vue.use(VueI18n);
Vue.use(Vuex);

const i18n = new VueI18n({
  locale: 'en',
});

const stateDatas = {
  courseDatas: [{
    category: { en: 'Fundamental Subjects - Interdisciplinary Subjects', jp: '基盤科目-共通科目', kana: '' },
    language: { en: '', jp: '', kana: '' },
    lecturers: [{
      imgUrl: '',
      name: { en: '', jp: '萩野 達也', kana: 'ハギノ タツヤ' },
      id: '',
      email: 'hagino@sfc.keio.ac.jp',
      inCharge: true,
    }],
    title: {
      postscript: { en: '', jp: '', kana: '' },
      name: { en: 'MATHEMATICS FOR INFORMATION SCIENCE', jp: '情報数学', kana: '' },
    },
    schedule: { year: 2000 },
    span: { en: '', jp: '', kana: '' },
    semester: { en: '', jp: '', kana: '' },
    times: { en: '', jp: '', kana: '' },
    related: null,
    registration: {
      number: null,
      suggestion: { en: '', jp: '', kana: '' },
      requirement: { en: '', jp: '', kana: '' },
      prerequisite: null,
    },
    classroom: '',
    summary: {
      en: `A programs can be seen as a mathematical function which calculate output value for a given input. In this lecture, we will look into the property of functions which correspond to programs.
  Firstly, in order to understand what we can calculate using programs, we compare three models of programs: recursive functions, turing machines and lambda calculi. We will show that three models are equivalent.
  Secondly, we will study complete partial order which gives the model of lambda calculi and programs.
  Thirdly, in order to understand data types of programs, we will look into category theory which is the abstraction of functions and can show the beauty behind data types.
  `,
      jp: `プログラムは入力から出力を計算する数学的な関数とみなすことができる．この授業では．プログラムに対応する関数がどのような性質を持つかについて考える．
  最初に，プログラムによる計算を理解するために，プログラムの3つのモデルを比較する：帰納的関数，チューリング機械，ラムダ計算．これらの3つもモデルが同値であることを示す．
  次に，ラムダ計算の意味を与える半順序について学ぶ．
  最後に，プログラムのデータ型に関係する数学の基礎理論であるカテゴリ理論について取り扱う．`,
      kana: '',
    },
    types: null,
    yearClassId: null,
    tag: { giga: true },
    curriculumCode: '',
    credit: 2,
  }],
};

const store = new Vuex.Store({
  state: stateDatas,
});

export { i18n, store };
