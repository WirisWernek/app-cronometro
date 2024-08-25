import { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numero: 0,
      botao: "Iniciar",
      ultimo: null,
    };

    this.timer = null;

    this.iniciar = this.iniciar.bind(this);
    this.limpar = this.limpar.bind(this);
  }

  iniciar() {
    if (this.timer != null) {
      this.setState({ botao: "Continuar" });
      clearInterval(this.timer);
      this.timer = null;
    } else {
      this.setState({ botao: "Parar" });
      this.timer = setInterval(() => {
        this.setState({ numero: this.state.numero + 0.1 });
      }, 100);
    }
  }

  limpar() {
    if (this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.setState({
      numero: 0,
      botao: "Iniciar",
      ultimo: this.state.numero.toFixed(1),
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("./assets/cronometro.png")}
          style={styles.image}
        />
        <Text style={styles.timer}>{this.state.numero.toFixed(1)}</Text>

        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.botao} onPress={() => this.iniciar()}>
            <Text style={styles.btnTexto}>{this.state.botao}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={() => this.limpar()}>
            <Text style={styles.btnTexto}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ultimosTempos}>
          {this.state.ultimo != null && (
            <Text style={styles.textoTempo}>
              Ultimo Tempo: {this.state.ultimo}'s
            </Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00aeef",
    alignItems: "center",
    justifyContent: "center",
  },
  timer: {
    marginTop: -150,
    color: "#FFF",
    fontSize: 60,
    fontWeight: "bold",
  },

  btnArea: {
    flexDirection: "row",
    marginTop: 70,
    height: 40,
  },
  botao: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    height: 40,
    margin: 17,
	width: 150,
    borderRadius: 9,
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00aeef",
  },
  ultimosTempos: {
    marginTop: 40,
  },
  textoTempo: {
    fontSize: 25,
    fontStyle: "italic",
    color: "#FFF",
  },
});
