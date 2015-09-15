<?php
/*
 * @name Asset for ArrayInput widget
 * @author ejkot 
 */
namespace app\widgets\ejkot\assets;
use yii\web\AssetBundle;

class arrayinputAsset extends AssetBundle {
    public $sourcePath='@app/widgets/ejkot/assets/';
    public $css=[
        'arrayinput.css',
    ];
    public $js=[
        'arrayinput.js',
    ];
    public $depends=[
        
    ];
}
