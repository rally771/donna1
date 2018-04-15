from flask import Flask, render_template , request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']=''
db = SQLALchemy(app)

class FileContents(db.model):
    id = db.Column(db.Integer, primary_key=True)
    name=db.Column(db.LargeBinary)


@app.route('/')
def inder():
    return render_template('home.html')

@app.route('/upload',methods=['POST'])
def upload():
    file = request.files['inputFile']

    newFile = FileContents(name=file.filename, data=file.read())
    db.session.add(newFile)
    db.session.commit()
    return file.filename

if __name__ == '__main__':
    app.run(debug=True)
