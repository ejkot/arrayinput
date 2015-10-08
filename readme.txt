ArrayInput YII2 field widget
ejkot ArrayInput - is an jQuery-based yii2 widget for text-input field, containing postgres integer array value (format e.x. {1,2,...}).
This widget make tags-liked interface for add and delete values in base field, taken from Array ('id'=>'name').

History:
Version 0.3alpha
- Add ajax method for data source,
- add callback method before adding data in field

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
/* Ajax datasource and callback test*/
$addcallback=new jsExpression("function (id,name) {console.log(id+'=>'+name);}");
echo $form->field($campaign,'georegions')->widget(ArrayInput::className(),['list'=>ArrayHelper::map($model->gettagsList()),'ajaxurl'=>'/formcontroller/gettags','beforeaddcallback'=>$addcallback]);
...

parametr list : 
list array ['id'=>'value'] e.x. ['1'=>'Value 1' ...]  
- Array of values to add or start massive of values for ajax method (already selected values array)
ajaxurl  - string - url for ajax datasource, must return json array in format {'id' : id, 'short_name' : Short name (show in selected buttons area), 'full_name' : full_name (show in autocomplete dropdown)},
						and must take 'q' string parameter for autocomplete search (autocomplete value);
beforeaddcallback - jsExpression object - callback function, called before add element in selected buttons area. (may be used for validation and etc)

input field data format: postgres integer arrays. (e.x. {1,2,3....} )