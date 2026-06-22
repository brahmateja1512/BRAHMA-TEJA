& "C:\Program Files\Git\cmd\git.exe" config --global user.name "Brahma Teja"
& "C:\Program Files\Git\cmd\git.exe" config --global user.email "brahmateja1512@users.noreply.github.com"
& "C:\Program Files\Git\cmd\git.exe" init
& "C:\Program Files\Git\cmd\git.exe" add .
& "C:\Program Files\Git\cmd\git.exe" commit -m "Initial commit of futuristic portfolio"
& "C:\Program Files\Git\cmd\git.exe" branch -M main
& "C:\Program Files\Git\cmd\git.exe" remote remove origin 2>$null
& "C:\Program Files\Git\cmd\git.exe" remote add origin https://github.com/brahmateja1512/BRAHMA-TEJA.git
& "C:\Program Files\Git\cmd\git.exe" push -u origin main
