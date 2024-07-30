1. Inside root folder: (For backend)
   - $ virtualenv picpred_backend
   - $ cd picpred_backend
   - $ Scripts\activate 
2. pip install absl-py astor cachetools certifi chardet Django django-cors-headers djangorestframework gast google-auth google-auth-oauthlib google-pasta grpcio h5py idna joblib Keras Keras-Applications keras-Preprocessing Markdown numpy oauthlib opencv-python opt-einsum pandas Pillow protobuf pyasn1 pyasn1-modules python-dateutil pytz PyYAML rsa scikit-learn
3. For starting django backend project, run:
   - $ django-admin startproject picpred
   - $ mv picpred src
   - $ cd src
   - Start a new app in the project:
      - $ python manage.py startapp images
      - $ python manage.py migrate
      - $ python manage.py createsuperuser
4. Inside root folder: (For frontend)
   - If in virtual environment, run below to exit from it:
       - $ deactivate
   - $ npx create-react-app picpred_frontend
   - $ cd picpred_frontend
   - $ npm install react-bootstrap bootstrap
   - $ npm install --save react-dropzone
   - $ npm i axios