ArrayInput YII2 field widget
ejkot ArrayInput - is an jQuery-based yii2 widget for text-input field, containing postgres integer array value (format e.x. {1,2,...}).
This widget make tags-liked interface for add and delete values in base field, taken from Array ('id'=>'name').

History:

Version 0.2alpha
Move dropdown array to JQuery plugin options

Version 0.1alpha

Some bugfixs...

Version: 0.0alpha

Start version

Quick start:
1. Place code in app/widgets/ejkot/ path
2. Usage ex. in view:
...
use app\widgets\ejkot\ArrayInput;
...
/* In Active Form: */
echo $form->field($model,'fieldname')->widget(ArrayInput::className(),['list'=>  ArrayHelper::map(ReferenceModel::find()->all(),'id','name')]);
...

parametr list : 
list array ['id'=>'value'] e.x. ['1'=>'Value 1' ...]  
- Array of values to add. 

input field data format: postgres integer arrays. (e.x. {1,2,3....} )