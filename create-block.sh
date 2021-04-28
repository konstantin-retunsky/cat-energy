#!/bin/bash

IMAGES_STATUS=true
SPRITE_STATUS=true
SCRIPT_STATUS=true
TYPE_BLOCK="blocks"
PARENT="unset"
TEXT_STYLE=""
TEXT_PAGE="
{% extends \"global/page/layout.njk\" %}
{% set metaDescription = \"Главная страница\" %}
{% set title = \"Главная страница Sedona\" %}
{% set classPage = \"index\" %}
{%
  set data = {
    titlePage: \"Фото и видео\",
    textPage: \"Не можете решиться на путешествие из-за курса? Фотографии помогут вам забыть о политике и экономике.\"
  }
%}

{% block content %}
  <main class=\"main\">
    <h1 class=\"visually-hidden\">Главная страница сайта</h1>
    <h1 class=\"main__title\">
      {{ data.titlePage }}
    </h1>
    <p class=\"main__text\">
      {{ data.textPage }}
    </p>
  </main>
{% endblock %}
"
TEXT_BLOCK="{% import \"../../global/page/mixins.njk\" as mixins %}"
TEXT_NJK="$TEXT_BLOCK"
PARSED_ARGUMENTS=$(
  getopt -a -n create-block -o abc:d: --long parent:,page-block,no-script,no-images,no-sprite -- "$@"
)
VALID_ARGUMENTS=$?

function usage() {
  echo "Usage: create-block"
  echo -e "\t[ -a | --alpha ] [ -b | --beta ]"
  echo -e "\t[ -c | --charlie CHARLIE ]"
  echo -e "\t[ -d | --delta   DELTA   ] filename(s)"
  exit 2
}

if [ -z "$VALID_ARGUMENTS" ]; then
  usage
fi

eval set -- "$PARSED_ARGUMENTS"

while :; do
  case "$1" in
  -p | --parent)
    PARENT="$2"
    shift 2
    ;;
  --page-block)
    TYPE_BLOCK="pages"
    TEXT_NJK="$TEXT_PAGE"
    TEXT_STYLE="
      @import \"../../global/scss/variables.scss\";
      @import \"../../global/scss/mixins.scss\";
      @import \"../../global/scss/global_style.scss\";

      @import \"../../blocks/header/header.scss\";

      @import \"../../blocks/footer/footer.scss\";
    "
    shift
    ;;
  --no-images)
    IMAGES_STATUS=false
    shift
    ;;
  --no-sprite)
    SPRITE_STATUS=false
    shift
    ;;
  --no-script)
    SCRIPT_STATUS=false
    shift
    ;;
  --)
    if [ -n "$2" ]; then

      if [ -d "source" ]; then

        PATH_BLOCK="./source/$TYPE_BLOCK/$2"

        if [ $IMAGES_STATUS == false ]; then
          mkdir -p "$PATH_BLOCK"
        elif [ $SPRITE_STATUS == false ]; then
          mkdir -p "$PATH_BLOCK/images"
        else
          mkdir -p "$PATH_BLOCK/images/sprite"
        fi

        if [ $SCRIPT_STATUS == true ]; then
          echo "" >>"$PATH_BLOCK/$2.js"
        fi

        if [ $TYPE_BLOCK == "blocks" ]; then
          TEXT_NJK="
            $TEXT_NJK

            {%
              set data = {
                class: \"$2\",
                title: {
                  class: \"$2__title\",
                  text: \"title\"
                },
                text: {
                  class: \"$2__text\",
                  text: \"text\"
                }
              }
            %}

            <section class=\"{{ data.class }}\">
              <h2 class=\"visually-hidden\"></h1>
              <h2 class=\"{{ data.title.class }}\">
                {{ data.title.text }}
              </h2>
              <p class=\"{{ data.text.class }}\">
                {{ data.text.text }}
              </p>
            </section>
          "

          TEXT_STYLE="
            .$2 {
              display: flex;

              @include media-tablet {
              }

              @include media-desktop {
              }
            }

            .$2__title {
              margin: 0;
              font-size: \$fs-18;
              line-height: \$lh-26;
              font-weight: 700;

              @include media-tablet {
                margin: 0;
              }

              @include media-desktop {
                margin: 0;
              }
            }

            .$2__text {
              margin: 0;
              font-size: \$fs-16;
              line-height: \$lh-26;
              font-weight: 400;

              @include media-tablet {
                margin: 0;
              }

              @include media-desktop {
                margin: 0;
              }
            }
          "
        fi

        echo "$TEXT_NJK" >>"$PATH_BLOCK/$2.njk"
        echo "$TEXT_STYLE" >>"$PATH_BLOCK/$2.scss"

        if [ $PARENT != "unset" ]; then
          PATH_PARENT=$(find -name ./source/$PARENT)

          if [[ $PATH_PARENT =~ (.+pages.+) ]]; then
            sed -i "/<\/main>.*/i {% include \"blocks/$2/$2.njk\" %}" "$PATH_PARENT/$PARENT.njk"
            echo "@import \"../../blocks/$2/$2.scss\";" >> "$PATH_PARENT/$PARENT.scss"
          else
            sed -i "/<\/section>.*/i {% include \"blocks/$2/$2.njk\" %}" "$PATH_PARENT/$PARENT.njk"
            sed -i "1i @import \"../../blocks/$2/$2.scss\";" test.sh "$PATH_PARENT/$PARENT.scss"
          fi

        fi
      else
        echo "No such \"source\" directory"
        usage
      fi

    else
      usage
    fi
    shift
    break
    ;;
  *)
    echo "Unexpected option: $1 - this should not happen."
    usage
    ;;
  esac
done

