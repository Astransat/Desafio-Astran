from django import forms


class FormPrice(forms.Form):
    name = forms.CharField(label='Ação', max_length=100)
    widgets = {
        'username': forms.TextInput(attrs={
            'class': 'form-control',
            'id': 'form3Example1c'
        })
    }


class FormHistory(forms.Form):
    name = forms.CharField(label='Ação', max_length=100)
    start = forms.CharField(label='Data Inicial', max_length=10)
    end = forms.CharField(label='Data Final', max_length=10)
    widgets = {
        'name': forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Exemplo: 2008-03-06'
        })
    }


class FormCompare(forms.Form):
    name = forms.CharField(label='Ação', max_length=100)
    names = forms.CharField(label='Outras ações', max_length=100)
