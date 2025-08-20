from flask import Flask, render_template

# Membuat instance aplikasi Flask
app = Flask(__name__)

@app.route('/')
def home():
    """
    Menyajikan halaman utama (index.html) dari folder 'templates'.
    Ini adalah satu-satunya rute yang dibutuhkan untuk aplikasi web statis ini.
    """
    return render_template('index.html')

if __name__ == '__main__':
    # Menjalankan server dalam mode debug untuk kemudahan pengembangan.
    # Server akan otomatis me-reload jika ada perubahan pada file.
    app.run(debug=True)
