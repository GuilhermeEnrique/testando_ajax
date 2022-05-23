<?php

$req = filter_input(INPUT_GET, "req", FILTER_SANITIZE_NUMBER_INT);
$arquivo = "usuario.txt";

switch ($req) {
    case 1:
        $CEP = filter_input(INPUT_POST, "txtCEP", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        $rua = filter_input(INPUT_POST, "txtRua", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        $ddd = filter_input(INPUT_POST, "txtDDD", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        $bairro = filter_input(INPUT_POST, "txtBairro", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        $estado = filter_input(INPUT_POST, "txtEstado", FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        $cidade = filter_input(INPUT_POST, "txtCidade", FILTER_SANITIZE_FULL_SPECIAL_CHARS);

        $str = "CEP: {$CEP} | Rua: {$rua} | Logradouro: {$ddd} | Bairro: {$bairro} | Estado: {$estado} | Cidade: {$cidade} |";

        $fp = fopen($arquivo, "w ");
        if (fwrite($fp, "{$str}")) {
            echo "1";
        } else {
            echo "0";
        }
        fclose($fp);
        break;

    case 2:
        $fp = fopen($arquivo, "r");
        $texto = fread($fp, filesize($arquivo));
        fclose($fp);
        echo $texto;
        break;

    default:
        echo "nada";
        break;
}
