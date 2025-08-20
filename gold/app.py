from flask import Flask, render_template, session, redirect, url_for
import random, secrets

app = Flask(__name__)
app.secret_key = secrets.token_hex(32)  # generate random key unik tiap run

# ---------- PETA HALAMAN VALID ----------
PAGE_MAP = {
    "building": "home.html",
    "dashboard": "dashboard.html",
    "pilih_bahasa": "bahasa.html",
    "Lobby": "lobby.html",
    "hah": "sT4rt.html",
    "pixel-start": "pixel_start_page.html",
    "l4B-H4cK": "lab/index.html",
    "pixel": "pixel.html",
    "t3Rm1Na1": "t3Rm1Na1.html",
    "workspace": "lobby.html",
    "TheGambit": "OldMoney.html"
}

# ---------- ROUTES ----------

@app.route('/go/<page>')
def go(page):
    """
    Semua navigasi masuk ke sini → 
    disimpan ke session target_page → 
    redirect ke /L04d (loading random).
    """
    if page not in PAGE_MAP:
        # kalau page tidak dikenal → langsung ke custom 404
        return redirect(url_for('lagi_nyari_apa'))
    session['target_page'] = page 
    return redirect(url_for('L04d'))

@app.route('/L04d')
def L04d():
    """
    Halaman loading random (antara L04d.html / load.html).
    Setelah selesai, JS di halaman loading akan redirect 
    ke target_page dari session.
    """
    session['has_seen_opening'] = True
    target = session.get('target_page')
    if not target:
        # fallback default kalau gak ada target
        target = 'dashboard'

    loading_pages = ['L04d.html', 'load.html', 'loading.html']
    selected_page = random.choice(loading_pages)
    return render_template(selected_page, target=target)

@app.route('/')
def loading_page():
    """
    Halaman awal → kalau user sudah pernah masuk, 
    langsung redirect ke terminal.
    """
    if session.get('has_seen_opening'):
        return redirect(url_for('TheGambit'))
    return render_template('sT4rt.html')

@app.route('/pilih_bahasa')
def bahasa():
    session['has_seen_opening'] = True
    return render_template('bahasa.html')

@app.route('/dashboard')
def dashboard():
    session['has_seen_opening'] = True
    return render_template('dashboard.html')

@app.route('/TheGambit')
def TheGambit():
    session['has_seen_opening'] = True
    return render_template('OldMoney.html')

@app.route('/Lobby')
def Lobby():
    session['has_seen_opening'] = True
    return render_template('lobby.html')

@app.route('/building')
def building():
    session['has_seen_opening'] = True
    return render_template('home.html')






@app.route('/t3Rm1Na1')
def t3Rm1Na1():
    session['has_seen_opening'] = True
    return render_template('t3Rm1Na1.html')

@app.route('/l4B-H4cK')
def lab():
    session['has_seen_opening'] = True
    return render_template('lab/index.html')

@app.route('/pixel-start')
def pixel_start_page():
    session['has_seen_opening'] = True
    return render_template('pixel_start_page.html')

@app.route('/pixel')
def home():
    session['has_seen_opening'] = True
    return render_template('pixel.html')

# ---------- ERROR HANDLER ----------

@app.errorhandler(404)
def page_not_found(e):
    """
    Custom error 404 → tampilkan halaman kocak + tombol
    balik ke terminal.
    """
    return render_template("404.html"), 404

# fallback khusus untuk /go jika page tidak ada di PAGE_MAP
@app.route('/lagi_nyari_apa')
def lagi_nyari_apa():
    return render_template("404.html"), 404

# ---------- MAIN ----------
if __name__ == '__main__':
    app.run(debug=True)
