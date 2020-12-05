/**
 * ひらがなのみに変換(スペース含む)
 * @param element
 * @param event
 * @param max_length
 */
function convert_hiragana(element, event, max_length = null) {
    convert_input_string(element, event, 'hiragana', true, max_length);
}

/**
 * 半角カナのみに変換(スペース含む)
 * @param element
 * @param event
 * @param max_length
 */
function convert_half_kana(element, event, max_length = null) {
    convert_input_string(element, event, 'half_kana', true, max_length);
}

/**
 * 口座振替で許容する半角カナのみに変換(スペース含む)
 * @param element
 * @param event
 * @param max_length
 */
function convert_half_kana_direct_debit(element, event, max_length = null) {
    convert_input_string(element, event, 'half_kana_direct_debit', true, max_length);
}

/**
 * 全角カナのみに変換(スペース含む)
 * @param element
 * @param event
 * @param max_length
 */
function convert_full_kana(element, event, max_length = null) {
    convert_input_string(element, event, 'full_kana', true, max_length);
}

/**
 * 全角のみに変換(スペース含む)
 * @param element
 * @param event
 * @param max_length
 */
function convert_full(element, event, max_length = null) {
    convert_input_string(element, event, 'full', true, max_length);
}

/**
 * 全角のみに変換(スペース含む・記号は許可しない)
 * @param element
 * @param event
 * @param max_length
 */
function convert_full_not_symbol(element, event, max_length = null) {
    convert_input_string(element, event, 'full_not_symbol', true, max_length);
}

/**
 * 半角カナ大文字に変換(スペース含む)
 * @param element
 * @param event
 * @param max_length
 */
function convert_half_large_kana(element, event, max_length = null) {
    convert_input_string(element, event, 'half_large_kana', true, max_length);
}

/**
 * 半角カナのみに変換(長音はハイフンマイナスに変換)(スペース含む)
 * @param element
 * @param event
 * @param max_length
 */
function convert_half_large_kana_hyphen(element, event, max_length = null) {
    convert_input_string(element, event, 'half_large_kana_hyphen', true, max_length);
}

/**
 * 半角英数に変換(スペース除去)
 * @param element
 * @param event
 * @param max_length
 */
function convert_half_alpha_numeric(element, event, max_length = null) {
    convert_input_string(element, event, 'half_alpha_numeric', false, max_length);
}

/**
 * 半角英数記号に変換(スペース除去)
 * @param element
 * @param event
 * @param max_length
 */
function convert_half_alpha_numeric_symbol(element, event, max_length = null) {
    convert_input_string(element, event, 'half_alpha_numeric_symbol', false, max_length);
}

/**
 * 半角英数に変換(スペース含む)
 * @param element
 * @param event
 * @param max_length
 */
function convert_half_alpha_numeric_allow_space(element, event, max_length = null) {
    convert_input_string(element, event, 'half_alpha_numeric', true, max_length);
}

/**
 * 半角数字に変換(スペース除去)
 * @param element
 * @param event
 * @param max_length
 */
function convert_half_numeric(element, event, max_length = null) {
    convert_input_string(element, event, 'half_numeric', false, max_length);
}

/**
 * 半角数字に変換(スペース含む)
 * @param element
 * @param event
 * @param max_length
 */
function convert_half_numeric_allow_space(element, event, max_length = null) {
    convert_input_string(element, event, 'half_numeric', true, max_length);
}

/**
 * 半角数字(0以上の整数)に変換(スペース除去)
 * @param element
 * @param event
 * @param max_length
 */
function convert_half_integer(element, event, max_length = null) {
    convert_input_string(element, event, 'half_numeric_integer', false, max_length);
}

/**
 * 半角数字(0以上の整数)に変換(スペース除去) ピリオドあり
 * @param element
 * @param event
 * @param max_length
 */
function convert_half_integer_period(element, event, max_length = null) {
    convert_input_string(element, event, 'half_numeric_integer_period', false, max_length);
}

/**
 * 電話番号文字列(半角数字+ハイフンマイナス)に変換(スペース除去)
 * @param element
 * @param event
 * @param max_length
 */
function convert_tel(element, event, max_length = null) {
    convert_input_string(element, event, 'tel', false, max_length);
}


/**
 * 入力文字列を変換
 * @param element
 * @param event
 * @param convert_type
 * @param allow_space
 * @param max_length
 */
function convert_input_string(element, event, convert_type, allow_space = true, max_length = null) {
    switch (event) {
        case 'compositionstart':
            isComposing = true;
            break;
        case 'compositionend':
            isComposing = false;
            break;
        case 'keyup':
        case 'blur':
            if (!isComposing) {
                let converted;

                switch (convert_type) {
                    case 'hiragana':
                        converted = moji($(element).val()).convert('KK', 'HG').toString();
                        converted = converted.replace(/[^\u3041-\u3096\　\ー]+/g,''); //ひらがな・スペース・ハイフン以外を除去

                        break;
                    case 'half_kana':
                        converted = $(element).val().replace(/[ー]+/g, 'ｰ');
                        converted = converted.replace(/[ぁ]+/g,'ァ'); // ぁ のみmoji.jsで変換できないのでここで変換

                        converted = moji(converted).convert('ZE', 'HE').convert('HG', 'KK').convert("ZK", "HK").toString();
                        converted = converted.replace(/[^ｦ-ﾟ \-\･\.]+/g,''); //半角カナ・ハイフン・スペース・中点・ピリオド以外を除去
                        break;

                    case 'half_large_kana':
                        converted = $(element).val().replace(/[ー]+/g, 'ｰ');
                        converted = converted.replace(/[ぁ]+/g,'ァ'); // ぁ のみmoji.jsで変換できないのでここで変換

                        converted = moji(converted).convert('ZE', 'HE').convert('HG', 'KK').convert("ZK", "HK").toString();
                        converted = converted.replace(/[^ｦ-ﾟ \-\･\.]+/g,''); //半角カナ・ハイフン・スペース・中点・ピリオド以外を除去

                        converted = kana_small_to_kana_large(converted);

                        break;

                    case 'half_large_kana_hyphen':
                        converted = $(element).val().replace(/[ー]+/g, 'ｰ');
                        converted = converted.replace(/[ｰ]+/g, '-');
                        converted = converted.replace(/[ぁ]+/g,'ァ'); // ぁ のみmoji.jsで変換できないのでここで変換

                        converted = moji(converted).convert('ZE', 'HE').convert('HG', 'KK').convert("ZK", "HK").toString();
                        converted = converted.replace(/[^0-9A-Zｦ-ﾟ \-\･\.]+/g,''); //数字・英字・半角カナ・ハイフン・スペース・中点・ピリオド以外を除去

                        converted = kana_small_to_kana_large(converted);

                        break;

                    case 'half_kana_alpha_numeric':
                        converted = $(element).val().replace(/[ー]+/g, 'ｰ');
                        converted = converted.replace(/[ぁ]+/g,'ァ'); // ぁ のみmoji.jsで変換できないのでここで変換

                        converted = moji(converted).convert('ZE', 'HE').convert('HG', 'KK').convert("ZK", "HK").toString();
                        converted = converted.replace(/[^0-9A-Zｦ-ﾟ \-\･\.]+/g,''); //数字・英字・半角カナ・ハイフン・スペース・中点・ピリオド以外を除去
                        break;

                    case 'half_kana_direct_debit':
                        converted = $(element).val().replace(/[ー]+/g, 'ｰ');
                        converted = converted.replace(/[ぁ]+/g,'ァ'); // ぁ のみmoji.jsで変換できないのでここで変換

                        converted = moji(converted).convert('ZE', 'HE').convert('HG', 'KK').convert("ZK", "HK").toString();
                        converted = converted.replace(/[^0-9A-Zｦ-ﾟ \-\(\)]+/g,''); //数字・英字・半角カナ・ハイフン・スペース・カッコ以外を除去
                        converted = kana_small_to_kana_large(converted);
                        converted = converted.substring(0, 30); // 口座名義は30文字まで

                        break;
                    case 'full_kana':
                        converted = moji($(element).val()).convert('HG', 'KK').toString();
                        converted = converted.replace(/[^\u30a1-\u30f6　ー]+/g,''); //全角カナ・スペース・ハイフン以外を除去

                        break;

                    case 'full':
                        converted = moji($(element).val()).convert('HE', 'ZE').toString();
                        converted = moji(converted).convert('HK', 'ZK').toString();
                        converted = moji(converted).convert('HS', 'ZS').toString();

                        break;

                    case 'full_not_symbol':
                        converted = $(element).val().replace(/[!-/:-@¥[-`{-~#]+/g,'');
                        converted = moji(converted).convert('HE', 'ZE').toString();
                        converted = moji(converted).convert('HK', 'ZK').toString();
                        converted = moji(converted).convert('HS', 'ZS').toString();

                        break;

                    case 'half_alpha_numeric_symbol':
                        converted = moji($(element).val()).convert("ZEtoHE").toString();
                        converted = converted.replace(/[^a-zA-Z0-9!-/:-@¥[-`{-~]+/g,'');
                        break;

                    case 'half_alpha_numeric':
                        converted = moji($(element).val()).convert("ZEtoHE").toString();
                        converted = converted.replace(/[^0-9a-zA-Z]+/g,'');
                        break;

                    case 'half_large_alpha_numeric':
                        converted = moji($(element).val()).convert("ZEtoHE").toString();
                        converted = converted.toUpperCase();
                        converted = converted.replace(/[^0-9A-Z ]+/g,'');
                        break;

                    case 'half_numeric':
                        converted = moji($(element).val()).convert("ZEtoHE").toString();
                        converted = converted.replace(/[^0-9]+/g,'');

                        break;

                    case 'half_numeric_integer':
                        converted = moji($(element).val()).convert("ZEtoHE").toString();
                        converted = converted.replace(/[^0-9]+/g,'');

                        if (converted !== '') {
                            converted = String(converted * 1);
                        }

                        break;

                    case 'half_numeric_integer_period':
                        converted = moji($(element).val()).convert("ZEtoHE").toString();
                        converted = converted.replace(/[^0-9\.]+/g,'');

                        break;

                    case 'tel':
                        converted = moji($(element).val()).convert("ZEtoHE").toString();
                        converted = converted.replace(/[^0-9\-]+/g,'');
                        converted = converted.substring(0, 13);

                        break;
                }

                if (!allow_space) {
                    converted = converted.trim();
                }

                if (max_length !== null) {
                    converted = converted.substring(0, max_length);
                }

                $(element).val(converted);
            }
            break;
        default:
    }
}

function kana_small_to_kana_large(str){
    var kanaMap = {
        'ｧ': 'ｱ', 'ｨ': 'ｲ', 'ｩ': 'ｳ', 'ｪ': 'ｴ', 'ｫ': 'ｵ',
        'ｯ': 'ﾂ', 'ｬ': 'ﾔ', 'ｭ': 'ﾕ', 'ｮ': 'ﾖ'
    };

    var reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
    return str
        .replace(reg, function (match) {
            return kanaMap[match];
        });
}

// 電話番号APIで取得したハイフンつきフォーマットに変更する
function format_tel(element) {
    var tel_number = $(element).val();
    if (tel_number.length < 3) {
        return;
    }
    $.ajax({
        type: "GET",
        url: "https://nb3.jp/api/tel/"+tel_number,
        success: function(ret) {

            if (ret['status'] === 'success') {
                $(element).val(ret['data']['tel_format']);
            }
        }
    });
}
