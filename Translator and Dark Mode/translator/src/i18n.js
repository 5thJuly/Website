import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "vi",
    resources: {
      en: {
        translation: {
          greeting: "Hello, world!",
          description: {
            line1: "This is a simple web app to demonstrate how to use i18next to translate the text content of a web page.",
            line2: "The app is built with ReactJS and i18next library. It supports multiple languages including English, French, and Vietnamese.",
            line3: "You can change the language by clicking on the language buttons above.",
            line4: "The source code of this app is available on GitHub at the following link:",
          }
        },
      },
      fr: {
        translation: {
          greeting: "Bonjour, Bienvenue!",
          description: {
            line1: "Ceci est une application web simple pour démontrer comment utiliser i18next pour traduire le contenu textuel d'une page web.",
            line2: "L'application est construite avec ReactJS et la bibliothèque i18next. Elle prend en charge plusieurs langues, dont l'anglais, le français et le vietnamien.",
            line3: "Vous pouvez changer la langue en cliquant sur les boutons de langue ci-dessus.",
            line4: "Le code source de cette application est disponible sur GitHub à l'adresse suivante:",
          }
        },
      },
      vi: {
        translation: {
          greeting: "Xin chào, thế giới!",
          description: {
            line1: "Đây là một ứng dụng web đơn giản để minh họa cách sử dụng i18next để dịch nội dung văn bản của một trang web.",
            line2: "Ứng dụng được xây dựng với ReactJS và thư viện i18next. Nó hỗ trợ nhiều ngôn ngữ bao gồm tiếng Anh, tiếng Pháp và tiếng Việt.",
            line3: "Bạn có thể thay đổi ngôn ngữ bằng cách nhấp vào các nút ngôn ngữ ở trên.",
            line4: "Mã nguồn của ứng dụng này có sẵn trên GitHub tại đường link sau:",
          }
        },
      },
      ja: {
        translation: {
          greeting: "こんにちは、世界！",
          description: {
            line1: "これは、Webページのテキストコンテンツを翻訳するためにi18nextを使用する方法を示す簡単なWebアプリケーションです。",
            line2: "このアプリケーションはReactJSとi18nextライブラリで構築されています。英語、フランス語、ベトナム語を含む複数の言語をサポートしています。",
            line3: "上部の言語ボタンをクリックして言語を変更できます。",
            line4: "このアプリケーションのソースコードは以下のGitHubリンクで利用可能です：",
          }
        },
      },
      ko: {
        translation: {
          greeting: "안녕하세요, 세계!",
          description: {
            line1: "이것은 웹 페이지의 텍스트 콘텐츠를 번역하기 위해 i18next를 사용하는 방법을 보여주는 간단한 웹 앱입니다.",
            line2: "이 앱은 ReactJS와 i18next 라이브러리로 구축되었습니다. 영어, 프랑스어, 베트남어를 포함한 여러 언어를 지원합니다.",
            line3: "위의 언어 버튼을 클릭하여 언어를 변경할 수 있습니다.",
            line4: "이 앱의 소스 코드는 다음 GitHub 링크에서 사용할 수 있습니다:",
          }
        },
      },
      zh: {
        translation: {
          greeting: "你好，世界！",
          description: {
            line1: "这是一个简单的网络应用程序，用于演示如何使用i18next翻译网页的文本内容。",
            line2: "该应用程序使用ReactJS和i18next库构建。它支持多种语言，包括英语、法语和越南语。",
            line3: "您可以通过点击上方的语言按钮来更改语言。",
            line4: "此应用程序的源代码可在以下GitHub链接获取：",
          }
        },
      }
    },
  });

export default i18n;